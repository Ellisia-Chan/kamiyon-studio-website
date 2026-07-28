import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Tag/time revalidation needs the API, not the CDN cache.
  useCdn: false,
})
