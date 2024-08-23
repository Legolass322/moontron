import type {FC, ReactNode} from 'react'

import * as styles from './DefaultModal.scss'
import { Button, ButtonProps, Typography } from 'antd'

export interface ButtonType extends ButtonProps {
  text: string
}

interface DefaultModalProps {
  icon?: ReactNode
  title?: string
  text?: string
  backgroundColor?: string
  color?: string
  buttons: ButtonType[]
  children?: ReactNode
}

export const DefaultModal: FC<DefaultModalProps> = props => {
  const {icon, title, text, backgroundColor, color, buttons, children} = props

  return (
    <div className={styles.root} style={{backgroundColor, color}}>
      <div className={styles.content}>
        {icon ? <div className={styles.icon}>{icon}</div> : null}
        {title && (
          <Typography className={styles.title}>
            {title}
          </Typography>
        )}
        {text && (
          <Typography>
            {text}
          </Typography>
        )}
        {children}
      </div>
      {buttons.length > 0 && (
        <div className={styles.buttonRow}>
          {buttons.map(({text, ...buttonProps}, index) => (
            <Button key={index} className={styles.button} {...buttonProps}>
              {text}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}
