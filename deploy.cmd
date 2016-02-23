@echo off
    IF "%SITE_FLAVOR%" == "web" (
	    set NPM_JS_PATH=%ProgramFiles(x86)%\npm\3.5.3\node_modules\npm\bin\npm-cli.js
      deploy.web.sh
    ) ELSE (
      IF "%SITE_FLAVOR%" == "api" (
        deploy.api.cmd
      ) ELSE (
        echo You have to set SITE_FLAVOR setting to either "web" or "api"
        exit /b 1
      )
    )