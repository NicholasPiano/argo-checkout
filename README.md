# Argo for Checkout

This repo contains a collection of packages for using Shopify’s Argo for Checkout. You’re probably looking for [`@shopify/argo-checkout`](packages/argo-checkout), which has all of the typings for the API available to Argo extensions. It also has documentation for the available [global API](packages/argo-checkout/documentation/globals.md), [extension points](packages/argo-checkout/documentation/extension-points.md), and [components](packages/argo-checkout/documentation/components.md).

This repo also has some of the helper packages Shopify uses to make Argo extensions easy to develop and deploy:

- [`@shopify/argo-run`](packages/argo-run) is a tiny asset dev server and production asset builder, powered by [webpack](https://webpack.js.org)
- [`@shopify/argo-webpack-hot-client`](packages/argo-webpack-hot-client) is an Argo-compatible replacement for [webpack-hot-client](https://github.com/webpack-contrib/webpack-hot-client) that enables auto-reloading in Argo extensions.
