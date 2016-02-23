#!/bin/bash

# ----------------------
# KUDU Deployment Script
# Version: 1.0.6
# ----------------------

# Helpers
# -------

exitWithMessageOnError () {
  if [ ! $? -eq 0 ]; then
    echo "An error has occurred during web site deployment."
    echo $1
    exit 1
  fi
}

# Prerequisites
# -------------

# Verify node.js installed
hash node 2>/dev/null
exitWithMessageOnError "Missing node.js executable, please install node.js, if already installed make sure it can be reached from current environment."

# Setup
# -----

SCRIPT_DIR="${BASH_SOURCE[0]%\\*}"
SCRIPT_DIR="${SCRIPT_DIR%/*}"
ARTIFACTS=$SCRIPT_DIR/../artifacts
KUDU_SYNC_CMD=${KUDU_SYNC_CMD//\"}

if [[ ! -n "$DEPLOYMENT_SOURCE" ]]; then
  DEPLOYMENT_SOURCE=$SCRIPT_DIR
fi

if [[ ! -n "$NEXT_MANIFEST_PATH" ]]; then
  NEXT_MANIFEST_PATH=$ARTIFACTS/manifest

  if [[ ! -n "$PREVIOUS_MANIFEST_PATH" ]]; then
    PREVIOUS_MANIFEST_PATH=$NEXT_MANIFEST_PATH
  fi
fi

if [[ ! -n "$DEPLOYMENT_TARGET" ]]; then
  DEPLOYMENT_TARGET=$ARTIFACTS/wwwroot
else
  KUDU_SERVICE=true
fi

if [[ ! -n "$KUDU_SYNC_CMD" ]]; then
  # Install kudu sync
  echo Installing Kudu Sync
  npm install kudusync -g --silent
  exitWithMessageOnError "npm failed"

  if [[ ! -n "$KUDU_SERVICE" ]]; then
    # In case we are running locally this is the correct location of kuduSync
    KUDU_SYNC_CMD=kuduSync
  else
    # In case we are running on kudu service this is the correct location of kuduSync
    KUDU_SYNC_CMD=$APPDATA/npm/node_modules/kuduSync/bin/kuduSync
  fi
fi

##################################################################################################################################
# Deployment
# ----------

echo Moving to source directory
pushd "$DEPLOYMENT_SOURCE/Source/E133.Web"

echo Installing npm packages
npm install
exitWithMessageOnError "npm failed"

echo Installing jspm packages
npm install jspm
exitWithMessageOnError "installing jspm failed"  
./node_modules/.bin/jspm install  
exitWithMessageOnError "jspm failed"

echo Running Gulp
npm install gulp 
exitWithMessageOnError "installing gulp failed"  
./node_modules/.bin/gulp export
exitWithMessageOnError "gulp failed"  

echo Moving back from source directory
popd



# 1. Select node version  
#selectNodeVersion  

# 2. Install npm packages  
#if [ -e "$DEPLOYMENT_SOURCE/package.json" ]; then  
#  eval $NPM_CMD install  
#  exitWithMessageOnError "npm failed"  
#fi  

# 3. Install bower packages  
#if [ -e "$DEPLOYMENT_SOURCE/bower.json" ]; then  
#  eval $NPM_CMD install bower  
#  exitWithMessageOnError "installing bower failed"  
#  ./node_modules/.bin/bower install  
#  exitWithMessageOnError "bower failed"  
#fi  

# 4. Run gulp for build
#if [ -e "$DEPLOYMENT_SOURCE/gulpfile.js" ]; then  
#  eval $NPM_CMD install gulp 
#  exitWithMessageOnError "installing gulpfailed"  
#  ./node_modules/.bin/gulp export
#  exitWithMessageOnError "gulp failed"  
#fi  




echo Handling Basic Web Site deployment.

# 1. KuduSync
if [[ "$IN_PLACE_DEPLOYMENT" -ne "1" ]]; then
  "$KUDU_SYNC_CMD" -v 50 -f "$DEPLOYMENT_SOURCE/Source/E133.Web/export" -t "$DEPLOYMENT_TARGET" -n "$NEXT_MANIFEST_PATH" -p "$PREVIOUS_MANIFEST_PATH" -i ".git;.hg;.deployment;deploy.sh"
  exitWithMessageOnError "Kudu Sync failed"
fi

##################################################################################################################################

# Post deployment stub
if [[ -n "$POST_DEPLOYMENT_ACTION" ]]; then
  POST_DEPLOYMENT_ACTION=${POST_DEPLOYMENT_ACTION//\"}
  cd "${POST_DEPLOYMENT_ACTION_DIR%\\*}"
  "$POST_DEPLOYMENT_ACTION"
  exitWithMessageOnError "post deployment action failed"
fi

echo "Finished successfully."
