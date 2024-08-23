export const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }
    const date = new Date(dateString)
    const formattedDate = date.toLocaleDateString("en-US", options)
  
    return formattedDate
  }