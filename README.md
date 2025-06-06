# loadBalancer

Here’s what I tackled:

1️⃣ I used child_process to spawn multiple instances of my application, each running on a different port.

2️⃣ The main server uses a round-robin approach to redirect incoming requests to each instance. I went with a 307 redirect to ensure that the client’s request method and cookies are preserved, unlike the 303 redirect, which only supports GET. You can read more about the 307 status code here: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/307

3️⃣ For redirection, I coded a route that performs a synchronous, resource-intensive calculation to simulate a real API workload. I added a route to terminate the application server on request and have the load balancer restart it if it goes down. 💡

#Test Results
Running 1 server instance: 20 sets of 100 concurrent calls completed in ~42 seconds.

Increased to 2 instances: Average dropped to ~22 seconds.

With 4 instances: The same workload completed in just ~6 seconds! ⚡