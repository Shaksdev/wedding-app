import { useState, useEffect, useRef } from 'react'
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp
} from 'firebase/firestore'
import { db } from '../firebase'
import useReveal from '../hooks/useReveal'
import styles from './PhotoGallery.module.css'

const CLOUD_NAME    = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
const WEDDING_DATE  = import.meta.env.VITE_WEDDING_DATE

// Check if today is on or after the wedding date
function isEventUnlocked() {
  const today  = new Date()
  const target = new Date(`${WEDDING_DATE}T00:00:00`)
  return today >= target
}

function PhotoCard({ url, uploadedBy }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <div className={styles.photoCard}>
      {!loaded && <div className={styles.photoSkeleton} />}
      <img
        src={url}
        alt={`Shared by ${uploadedBy || 'a guest'}`}
        className={`${styles.photo} ${loaded ? styles.photoVisible : ''}`}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
      />
      {uploadedBy && (
        <p className={styles.photoBy}>{uploadedBy}</p>
      )}
    </div>
  )
}

function PhotoGallery() {
  const sectionRef  = useReveal()
  const fileRef     = useRef(null)
  const unlocked    = isEventUnlocked()

  const [photos,     setPhotos]     = useState([])
  const [uploading,  setUploading]  = useState(false)
  const [uploaderName, setUploaderName] = useState('')
  const [preview,    setPreview]    = useState(null)
  const [file,       setFile]       = useState(null)
  const [confirm,    setConfirm]    = useState(false)
  const [error,      setError]      = useState('')

  // Real-time listener for photos from Firestore
  useEffect(() => {
    const q = query(
      collection(db, 'photos'),
      orderBy('timestamp', 'desc')
    )
    const unsub = onSnapshot(q, (snap) => {
      setPhotos(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    })
    return () => unsub()
  }, [])

  const handleFileChange = (e) => {
    const selected = e.target.files[0]
    if (!selected) return
    // Show a local preview before uploading
    setFile(selected)
    setPreview(URL.createObjectURL(selected))
    setError('')
  }

  const handleUpload = async () => {
    if (!file) return
    setUploading(true)
    setError('')

    try {
      // Upload to Cloudinary
      // FormData is how browsers send files to servers
      const formData = new FormData()
      formData.append('file',         file)
      formData.append('upload_preset', UPLOAD_PRESET)
      formData.append('folder',       'wedding-photos')

      const res  = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        { method: 'POST', body: formData }
      )
      const data = await res.json()

      if (!data.secure_url) throw new Error('Upload failed')

      // Save the Cloudinary URL to Firestore
      await addDoc(collection(db, 'photos'), {
        url:        data.secure_url,
        uploadedBy: uploaderName.trim() || 'A guest',
        timestamp:  serverTimestamp()
      })

      // Reset
      setFile(null)
      setPreview(null)
      setUploaderName('')
      if (fileRef.current) fileRef.current.value = ''
      setConfirm(true)
      setTimeout(() => setConfirm(false), 4000)

    } catch (err) {
      console.error('Upload error:', err)
      setError('Upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const handleCancel = () => {
    setFile(null)
    setPreview(null)
    setError('')
    if (fileRef.current) fileRef.current.value = ''
  }

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.inner}>

        <div className="reveal">
          <p className={styles.label}>Memories</p>
          <h2 className={styles.title}>Share a <em>Moment</em></h2>
          <p className={styles.subtitle}>
            Capture and share your favourite moments from our celebration
          </p>
        </div>

        {!unlocked ? (
          // LOCKED STATE — shown before the wedding date
          <div className={`${styles.lockedBox} reveal`}>
            <div className={styles.lockIcon}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="5" y="11" width="14" height="10" rx="2" stroke="#C9A84C" strokeWidth="1.3"/>
                <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="#C9A84C" strokeWidth="1.3" strokeLinecap="round"/>
                <circle cx="12" cy="16" r="1.5" fill="#C9A84C" opacity="0.6"/>
              </svg>
            </div>
            <p className={styles.lockedTitle}>Gallery Opens on Nikkah Day</p>
            <p className={styles.lockedSub}>
              Come back on 29th October 2026 to share your photos
              from our celebration. The gallery will remain open forever.
            </p>
            <div className={styles.lockedDate}>
              <span>29</span>
              <span className={styles.lockedDot}>·</span>
              <span>10</span>
              <span className={styles.lockedDot}>·</span>
              <span>2026</span>
            </div>
          </div>
        ) : (
          // UNLOCKED STATE — shown on and after wedding date
          <>
            {/* Upload area */}
            <div className={`${styles.uploadBox} reveal`}>

              <div className={styles.uploadCornerTL} />
              <div className={styles.uploadCornerTR} />
              <div className={styles.uploadCornerBL} />
              <div className={styles.uploadCornerBR} />

              {!preview ? (
                // File picker
                <div
                  className={styles.dropZone}
                  onClick={() => fileRef.current?.click()}
                >
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
                    <rect x="3" y="3" width="18" height="18" rx="2" stroke="#C9A84C" strokeWidth="1.2" opacity="0.5"/>
                    <circle cx="8.5" cy="8.5" r="1.5" stroke="#C9A84C" strokeWidth="1.2" opacity="0.5"/>
                    <path d="M3 15l5-5 4 4 3-3 6 6" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
                  </svg>
                  <p className={styles.dropText}>Tap to select a photo</p>
                  <p className={styles.dropSub}>JPG, PNG, HEIC up to 10MB</p>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className={styles.fileInput}
                  />
                </div>
              ) : (
                // Preview + confirm
                <div className={styles.previewArea}>
                  <img src={preview} alt="Preview" className={styles.previewImg} />
                  <div className={styles.previewForm}>
                    <div className={styles.group}>
                      <label>Your Name <span className={styles.optional}>(optional)</span></label>
                      <input
                        type="text"
                        placeholder="e.g. Aunty Ashabi"
                        value={uploaderName}
                        onChange={(e) => setUploaderName(e.target.value)}
                        disabled={uploading}
                      />
                    </div>
                    {error && <p className={styles.error}>{error}</p>}
                    <div className={styles.previewBtns}>
                      <button
                        className={styles.cancelBtn}
                        onClick={handleCancel}
                        disabled={uploading}
                      >
                        Cancel
                      </button>
                      <button
                        className={styles.uploadBtn}
                        onClick={handleUpload}
                        disabled={uploading}
                      >
                        {uploading ? 'Uploading...' : 'Share Photo'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {confirm && (
                <p className={styles.confirmMsg}>
                  &#10022; Your photo has been shared! Thank you. &#10022;
                </p>
              )}
            </div>

            {/* Photo grid */}
            {photos.length > 0 && (
              <div className={`${styles.grid} reveal`}>
                {photos.map(photo => (
                  <PhotoCard
                    key={photo.id}
                    url={photo.url}
                    uploadedBy={photo.uploadedBy}
                  />
                ))}
              </div>
            )}

            {photos.length === 0 && (
              <p className={`${styles.emptyGallery} reveal`}>
                No photos yet — be the first to share a memory &#10022;
              </p>
            )}
          </>
        )}

      </div>
    </section>
  )
}

export default PhotoGallery