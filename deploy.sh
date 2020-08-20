set -e

PROJECT_NAME=$1
COMMIT=$2
ENV=$3

echo "DEPLOYMENT OF "$PROJECT_NAME""

if [ $(docker ps -f name=${PROJECT_NAME}_blue -q) ]
then
    ENV="${PROJECT_NAME}_php_green"
    OLD="${PROJECT_NAME}_php_blue"
else
    ENV="${PROJECT_NAME}_php_blue"
    OLD="${PROJECT_NAME}_php_green"
fi

if [ -f ~/${PROJECT_NAME}/.env ]
then
  export $(cat ~/${PROJECT_NAME}/.env | sed 's/#.*//g' | xargs)
fi

docker-compose -f ~/$PROJECT_NAME/docker-compose.yml pull

if [ $(docker ps -f name=$OLD -q) ]
then
  echo "Stopping "$OLD" container"
  docker-compose -f ~/$PROJECT_NAME/docker-compose.yml --project-name=$OLD stop
fi

echo "Starting "$ENV" container"
docker-compose -f ~/$PROJECT_NAME/docker-compose.yml --project-name=$ENV up -d #--force-recreate

docker image prune -f
