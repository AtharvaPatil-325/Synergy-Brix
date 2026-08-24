export type ContactFormValues = {
  name: string
  company?: string
  email: string
  phone?: string
  projectType?: string
  budget?: string
  timeline?: string
  message: string
}

export type ContactSubmissionResult = {
  success: boolean
  message: string
}

const providerEndpoint = import.meta.env.VITE_CONTACT_PROVIDER_URL

export async function submitContactForm(values: ContactFormValues): Promise<ContactSubmissionResult> {
  if (providerEndpoint) {
    try {
      await fetch(providerEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      return { success: true, message: 'Your message has been sent successfully.' }
    } catch (error) {
      console.error('Contact submission failed', error)
      return { success: false, message: 'Submission could not be completed. Please email us directly or try again later.' }
    }
  }

  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve({
        success: true,
        message: 'Demo submission received. Connect a backend or form provider later to store submissions.',
      })
    }, 700)
  })
}
