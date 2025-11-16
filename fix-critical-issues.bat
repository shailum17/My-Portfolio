@echo off
echo ========================================
echo  Fixing Critical Portfolio Issues
echo ========================================
echo.

echo [1/5] Updating vulnerable dependencies...
call npm install nodemailer@^7.0.10
call npm install @vercel/node@2.3.0
call npm install vite@^7.2.2 --save-dev
echo.

echo [2/5] Running ESLint auto-fix...
call npm run lint:fix
echo.

echo [3/5] Verifying security fixes...
call npm audit
echo.

echo [4/5] Running build test...
call npm run build
echo.

echo [5/5] Done!
echo.
echo ========================================
echo  Review the report in:
echo  testsprite_tests/BUG_AND_VULNERABILITY_REPORT.md
echo ========================================
pause
