aws s3 sync . s3://sachinahuja.info --exclude ".git/*" --exclude ".DS_Store" --exclude "deploy.sh"
aws cloudfront create-invalidation --distribution-id=E2ZFFLBYOH213A --paths "/*"
