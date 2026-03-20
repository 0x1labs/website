import fs from 'node:fs/promises'
import path from 'node:path'
import { parse } from 'csv-parse/sync'

export type CareerOpening = {
  id: string
  slug: string
  title: string
  team: string
  location: string
  employmentType: string
  experience: string
  status: 'open' | 'closed'
  featured: boolean
  shortDescription: string
  responsibilities: string[]
  requirements: string[]
  tallyUrl: string
  postedAt: string
  closingAt?: string
}

const CAREERS_CSV_PATH = path.join(process.cwd(), 'content', 'careers', 'openings.csv')

function safeSplit(value: string): string[] {
  return value
    .split('|')
    .map((item) => item.trim())
    .filter(Boolean)
}

function toBoolean(value: string): boolean {
  return value.toLowerCase() === 'true'
}

function normalizeRow(row: Record<string, string>): CareerOpening {
  const status = row.status?.toLowerCase() === 'closed' ? 'closed' : 'open'

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    team: row.team,
    location: row.location,
    employmentType: row.employment_type,
    experience: row.experience,
    status,
    featured: toBoolean(row.featured ?? 'false'),
    shortDescription: row.short_description,
    responsibilities: safeSplit(row.responsibilities ?? ''),
    requirements: safeSplit(row.requirements ?? ''),
    tallyUrl: row.tally_url,
    postedAt: row.posted_at,
    closingAt: row.closing_at || undefined,
  }
}

export async function getAllOpenings(): Promise<CareerOpening[]> {
  const csv = await fs.readFile(CAREERS_CSV_PATH, 'utf8')
  const rows = parse(csv, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  }) as Record<string, string>[]

  return rows.map(normalizeRow)
}

export async function getOpenOpenings(): Promise<CareerOpening[]> {
  const openings = await getAllOpenings()
  return openings
    .filter((opening) => opening.status === 'open')
    .sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime())
}

export async function getOpeningBySlug(slug: string): Promise<CareerOpening | null> {
  const openings = await getAllOpenings()
  return openings.find((opening) => opening.slug === slug) ?? null
}

export async function getAllOpeningSlugs(): Promise<string[]> {
  const openings = await getAllOpenings()
  return openings.map((opening) => opening.slug)
}
