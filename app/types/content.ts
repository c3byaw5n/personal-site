export interface WorkItem {
  title: string
  description: string
  image: string
  github?: string
  url?: string
}

export interface BlogPost {
  title: string
  description: string
  date: string
  path: string
  tags?: string[]
  ogImage?: string
}
