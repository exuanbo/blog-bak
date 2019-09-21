#!/bin/bash
source ~/.bash_profile

echo -e "\033[0;32mDeploying updates to GitHub...\033[0m"

rm -rf public/*
hugo --minify --gc

cd public
font-spider --ignore "css/katex.min.css" *.html */*.html */*/*.html

git add -A
msg="rebuilding site `date`"
if [ $# -eq 1 ]
  then msg="$1"
fi
git commit -m "$msg"
git push -f origin master

cd ..
git add -A
git commit
git push -f origin master

echo -e "\n\033[0;32mDone!\033[0m"