@echo off
echo Deploying files...
xcopy "$DEPLOYMENT_SOURCE/Source/export" "%DEPLOYMENT_TARGET%" /Y /S

echo "Finished successfully."