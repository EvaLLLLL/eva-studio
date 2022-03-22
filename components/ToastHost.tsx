import React from 'react'
import { Toaster } from 'react-hot-toast'
import { colors } from '../lib'

export const ToastHost: React.FC = () => (
    <Toaster
      toastOptions={{
        success: {
          style: {
            fontSize: 14,
            color: colors.text_3,
          },
        },
      }}
    />
  )
