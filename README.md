[![DeepScan grade](https://deepscan.io/api/teams/8152/projects/11541/branches/172736/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=8152&pid=11541&bid=172736)
# user-service
Motum micro service responsible for retrieving and updating user data

Steps to get it up and running:
- Specify environment variables, such as:
  - `DATABASE_URL`: posrgress URL to a database in format: `postgresql://<username>:<password>@<hostname>:<port>/<database>?schema=<schema_name>` (for e.g. `postgresql://user:password@localhost:5432/motum?schema=public`)
  - `PORT`: port on which REST authentication api will be available
  - `BIND_ADDRESS`: address to bind REST api socket to
  - `BUCKET_NAME`: name of Google Cloud Storage bucket to store user avatars in
- `yarn build`
- `yarn start`

Or after you add env variables use `yarn docker` to build docker image
