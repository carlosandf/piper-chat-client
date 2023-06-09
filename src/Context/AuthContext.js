import { useState, useEffect, createContext } from 'react'
import { User, Auth } from '../api'
import { hasExpiredToken } from '../utils'

const userController = new User()
const authController = new Auth()

export const AuthContext = createContext()

export function AuthProvider (props) {
  const { children } = props
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      const accessToken = await authController.getAccessToken()
      const refreshToken = await authController.getRefreshToken()
      if (!accessToken || !refreshToken) {
        logout()
        setLoading(false)
        return
      }

      const isExpiredaccess = hasExpiredToken(accessToken)
      const isExpiredRefresh = hasExpiredToken(refreshToken)

      if (isExpiredaccess) {
        if (isExpiredRefresh) logout()
        else await reLogin(refreshToken)
      } else {
        await login(accessToken)
      }

      setLoading(false)
    })()
  }, [])

  const reLogin = async (refreshToken) => {
    try {
      setLoading(true)
      const newAccesToken = await authController.refreshAccessToken(refreshToken)
      await authController.setAccessToken(newAccesToken)
      await login(newAccesToken)
      setToken(newAccesToken)
    } catch (error) {
      logout()
    }
    setLoading(false)
  }

  const login = async (accessToken) => {
    try {
      setLoading(true)
      setToken(accessToken)
      const userStorage = await userController.getUserStorage()
      if (userStorage) {
        setUser({ ...userStorage })
      } else {
        const response = await userController.getMe(accessToken)
        await userController.setUserStorage(response)
        setUser({ ...response })
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  const logout = () => {
    userController.removeUserStorage()
    authController.removeTokens()
    setUser(null)
    setToken(null)
    setLoading(false)
  }

  const updateUser = ({ key, value }) => {
    if (key) {
      setUser({
        ...user,
        [key]: value
      })
      return
    }
    setUser({ ...user, ...value })
  }

  const data = {
    accessToken: token,
    user,
    login,
    logout,
    updateUser,
    loading
  }

  if (loading) return null
  return (
    <AuthContext.Provider value={data}>
      {children}
    </AuthContext.Provider>
  )
}
