#!/bin/sh

set -eu

cat > /usr/share/nginx/html/config.js <<CONF
window.__PORTFOLIO__ = {
  env: '${APP_ENV:-local}'
}
CONF

echo "runtime-config: APP_ENV=${APP_ENV:-local}"