@echo off
    IF "%SITE_FLAVOR%" == "web" (
      deploy.web.sh
    ) ELSE (
      IF "%SITE_FLAVOR%" == "api" (
        deploy.api.cmd
      ) ELSE (
        echo You have to set SITE_FLAVOR setting to either "web" or "api"
        exit /b 1
      )
    )