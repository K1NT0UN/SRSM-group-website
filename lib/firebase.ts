import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { firebaseConfig } from './leadConfig'

// Singleton Firebase app (avoids re-init on hot reload / multiple imports).
export const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig)
export const auth = getAuth(firebaseApp)
