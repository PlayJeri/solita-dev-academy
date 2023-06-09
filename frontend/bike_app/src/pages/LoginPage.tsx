import Cookies from 'js-cookie'
import React from 'react'
import Navbar from '../components/Navbar'
import LoginForm from '../components/LoginForm'

const baseURL = import.meta.env.VITE_BASE_URL

const LoginPage: React.FC = () => {

    const handleLogin = async (username: string, password: string) => {
        try {
            const response = await fetch(`${baseURL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "accept": "application/json"
                },
                body: `grant_type=&username=${username}&password=${password}&scope=&client_id=&client_secret=`,
            })
            const data = await response.json()
            console.log(data)
            Cookies.set('jwt_token', data.access_token, { expires: data.expires_in / 86400})
            if (response.status === 200) {
                window.location.href = '/add/station'
            }
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className="bg-gray-900 min-h-screen text-white">
        <Navbar />
        <LoginForm onSubmit={handleLogin} />
    </div>
  )
}

export default LoginPage