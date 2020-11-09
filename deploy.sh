#!/bin/bash
CONTAINER_PATTERN="andro-py"

echo $(printf %q "$BASH_SOURCE")$((($#)) && printf ' %q' "$@")

echo ""
echo "Running deploy script"
echo "Usage: deploy [ --only-front ] [ --delete-images ]"
echo ""

if [ "$1" == "--only-front" ] || [ "$2" == "--only-front" ]; then
  CONTAINER_PATTERN="andro-py-tool-front"
fi

echo "Stopping active containers..."
docker ps | grep $CONTAINER_PATTERN | awk '{print $1}' | xargs docker stop

if [ "$1" == "--delete-images" ] || [ "$2" == "--delete-images" ]; then
  echo "Deleting andro-py-tool container images..."
	docker images | grep $CONTAINER_PATTERN | awk '{print $3}' | xargs docker rmi
fi

echo "Updating front..."
git pull
echo "Building front image..."
docker build -t andro-py-tool-front .
echo "Running front image..."
docker run --rm -p 8841:80 -d andro-py-tool-front

if [ "$CONTAINER_PATTERN" == "andro-py-tool-front" ]; then
  cd ../AndroPyTool
  echo "Updating back..."
  git pull
  echo "Building back image..."
  docker build -t andro-py-tool .
  echo "Running back image..."
  docker run --rm -p 8840:5000 -v /home/arturotfg/AndroPyTool/rest_api/files:/apks -d andro-py-tool
fi
