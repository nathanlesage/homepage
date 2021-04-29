function img2figure (selector = 'article img') {
  const images = document.querySelectorAll(selector)
  
  images.forEach((img) => {
      // Create a figure, a caption, and a link element
      const fig = document.createElement('figure')
      const caption = document.createElement('figcaption')
      const link = document.createElement('a')
      
      // Populate the link to view the full size of the image
      link.setAttribute('target', '_blank')
      link.textContent = '[Full size]'
      link.setAttribute('href', img.getAttribute('src'))
      
      // Now add the ALT-text and the link to the caption
      let captionText = ''
      if (img.hasAttribute('title')) {
          captionText = img.getAttribute('title')
      } else if (img.hasAttribute('alt')) {
          captionText = img.getAttribute('alt')
      }

      caption.textContent = captionText + ' '
      caption.appendChild(link)

      // Compose the figure
      fig.appendChild(img.cloneNode())
      fig.appendChild(caption)
      
      // Replace the image with the figure
      img.parentElement.replaceChild(fig, img)
  })
}
