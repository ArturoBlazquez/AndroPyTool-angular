FROM node:12.16.1-alpine As builder

WORKDIR /usr/src/app

COPY . .

RUN npm i

RUN npm run build

FROM httpd:alpine

RUN rm -r /usr/local/apache2/htdocs/*
COPY --from=builder /usr/src/app/dist/front/ /usr/local/apache2/htdocs/

RUN sed -i \
  's/#LoadModule rewrite_module modules\/mod_rewrite.so/LoadModule rewrite_module modules\/mod_rewrite.so/g' \
  /usr/local/apache2/conf/httpd.conf

RUN sed -i '/<Directory "\/usr\/local\/apache2\/htdocs">/a### Rewrite rule was written from the Dockerfile when building the image ###\n\
    RewriteEngine on\n\
    RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -f [OR]\n\
    RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -d\n\
    RewriteRule ^ - [L]\n\
    RewriteRule ^ /index.html\n' \
  /usr/local/apache2/conf/httpd.conf

RUN sed -i '/<Files "\.ht\*">/,/<\/Files>/c# This was commented out from the Dockerfile\n# <Files ".ht*">\n#     Require all denied\n# <\/Files>' \
  /usr/local/apache2/conf/httpd.conf
