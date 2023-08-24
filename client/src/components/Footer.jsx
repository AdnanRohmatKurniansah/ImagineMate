import React from 'react'

export default function Footer() {
  const year = new Date()

  return (
    <footer className="footer footer-center p-4 bg-white border text-base-content">
        <div>
            <p>Copyright © {year.getFullYear()} - All right reserved by ARK</p>
        </div>
    </footer>
  )
}
