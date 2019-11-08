aws s3 sync . s3://www.sachinahuja.info --exclude ".git/*" --exclude ".DS_Store" --exclude "deploy.sh"
aws cloudfront create-invalidation --distribution-id E1JYPP5VMUO1QT --paths "/*"
aws cloudfront create-invalidation --distribution-id EBCUZ7EH94X0A --paths "/*"


