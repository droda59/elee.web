@echo off
echo Deploying files...
xcopy "$DEPLOYMENT_SOURCE/Source/export" "%DEPLOYMENT_TARGET%" /Y

echo "Finished successfully."