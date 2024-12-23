addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
  })
  
  async function handleRequest(request) {
    // Your request handling logic here
    return new Response('Hello World')
  }