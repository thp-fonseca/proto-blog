#!/bin/bash

# Nome do arquivo zip de saída
OUTPUT_ZIP="poc-turbo-repo.zip"

# Diretório de workspace
WORKSPACE_DIR="."

# Arquivos e diretórios a serem excluídos
EXCLUDE_PATTERNS=(
  "build/*"
  "**/build/**"
  ".next/*"
  "**/.next/**"
  ".turbo/*"
  "**/.turbo/**"
  "node_modules/*"
  "**/node_modules/**"
  ".env"
  ".env.local"
  "**/.env"
  "**/.env.local"
  "out/*"
  "**/out/**"
  ".git/*"
  "**/.git/**"
)

# Construir a string de exclusão para o comando zip
EXCLUDE_STRING=""
for pattern in "${EXCLUDE_PATTERNS[@]}"; do
  EXCLUDE_STRING+="--exclude=$pattern "
done

# Comando para zipar o workspace
zip -r $OUTPUT_ZIP $WORKSPACE_DIR $EXCLUDE_STRING

echo "Workspace zipado com sucesso em $OUTPUT_ZIP"
