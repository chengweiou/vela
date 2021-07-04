yarn build:uat
rm -rf ~/Desktop/docker/universe/vela/dist
cp -r dist ~/Desktop/docker/universe/vela/
cp nginx.conf ~/Desktop/docker/universe/vela/default.conf
cp docker-compose.yml ~/Desktop/docker/universe/vela/docker-compose.yml
cd ~/Desktop/docker/universe/vela

docker compose down
docker compose rm -f
docker compose up -d
