
## Antideploy findings

Antideploy’s deployment guide says it infers install, build, start, and port settings from the project, and that a root `Procfile` with a `web:` line or a root Dockerfile can correct an incorrect inferred start command. Its failure guide states that a web process must read the runtime `PORT` environment variable and bind to a reachable host rather than hard-coding port 3000. The GitHub deployment guide says connected repositories redeploy from the default branch and that a `Procfile` is the supported override when inferred commands are wrong. The compute guide notes that apps scale to zero, so a cold start is normal after inactivity.

Sources:
- https://antideploy.com/docs/guides/why-did-my-deployment-fail — Why Did My Deployment Fail?
- https://antideploy.com/docs/deploying/github.md — Deploy from GitHub
- https://antideploy.com/docs/how-it-works.md — How Antideploy Analyzes Your Code and Deploys It
- https://antideploy.com/docs/infrastructure/compute.md — Managed Compute: Containers and Scale-to-Zero
