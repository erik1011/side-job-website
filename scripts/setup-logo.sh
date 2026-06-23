#!/usr/bin/env bash
set -euo pipefail

SRC="/Users/admin/Documents/软件开发副业/内容素材/软件开发副业专业头像.png"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DST="$ROOT/public/images/logo.png"

if [[ ! -f "$SRC" ]]; then
  echo "错误：找不到源文件 $SRC"
  exit 1
fi

mkdir -p "$(dirname "$DST")"
cp "$SRC" "$DST"

if command -v sips >/dev/null 2>&1; then
  sips -Z 128 "$DST" --out "$DST" >/dev/null
  echo "已复制并优化 Logo：$DST ($(du -h "$DST" | cut -f1))"
else
  echo "已复制 Logo：$DST"
fi
