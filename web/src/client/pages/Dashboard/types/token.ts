type SocialLinks = {
  tg: string
}

type TokenData = {
  name: string
  short: string
  id: string

  img?: string
  links: Partial<SocialLinks>
}