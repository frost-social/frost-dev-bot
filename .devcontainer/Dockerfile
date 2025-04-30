FROM mcr.microsoft.com/devcontainers/base:ubuntu24.04@sha256:72679e41ad94ef98c31add0bf8a75eed424a3a9d29e3a847ef1eeecaee07174e

# Install Deno
ENV DENO_INSTALL=/usr/local
RUN curl -fsSL https://deno.land/install.sh \
  | sh

USER vscode

# Install deployctl
RUN deno install -A jsr:@deno/deployctl --global \
  && echo 'export PATH="/home/vscode/.deno/bin:$PATH"' \
    >> ~/.bashrc
