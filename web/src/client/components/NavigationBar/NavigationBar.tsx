import { FC, memo, useMemo } from "react"

import * as styles from './NavigationBar.scss'
import { Link, useLocation } from "react-router-dom"
import cn from "classnames"

const NavigationBarComponent: FC = () => {
  const {pathname} = useLocation()
  
  const links = useMemo(() => {
    return [
      {
        text: 'Hero',
        active: pathname.length < 2,
        to: '/'
      },
      {
        text: 'Dashboard',
        active: pathname.startsWith('/dashboard'),
        to: '/dashboard'
      },
      {
        text: 'Trade',
        active: pathname.startsWith('/trade'),
        to: '/trade'
      }
    ]
  }, [pathname])
  
  return <div className={styles.root}>
    <div className={styles.logo}></div>
    <nav className={styles.linksWrapper}>
      <ul className={styles.links}>
        {links.map(link => (
          <li key={link.text}>
            <Link to={link.to} className={cn(styles.link, {[styles.active]: link.active})}>{link.text}</Link>
          </li>
        ))}
      </ul>
    </nav>
    <div className={styles.action}></div>
  </div>
}

export const NavigationBar = memo(NavigationBarComponent)