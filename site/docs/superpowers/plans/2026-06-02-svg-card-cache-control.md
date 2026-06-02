# SVG Card Cache-Control Header Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ajouter un header `Cache-Control` à la route `/svg_card` pour que GitHub et les navigateurs cachent les cartes SVG, réduisant drastiquement les invocations Vercel.

**Architecture:** Modification d'une seule ligne dans `app/svg_card/route.tsx` — ajout de `Cache-Control: public, max-age=3600, stale-while-revalidate=86400` dans la `Response` de succès. Les erreurs (500) ne sont pas cachées.

**Tech Stack:** Next.js 14 App Router, HTTP Cache-Control headers

---

### Task 1: Ajouter le header Cache-Control

**Files:**
- Modify: `site/app/svg_card/route.tsx:59-63`

- [ ] **Step 1: Modifier la Response de succès**

Remplacer le bloc `return new Response(svg, {...})` actuel (lignes 59-63) par :

```tsx
return new Response(svg, {
    headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
});
```

- `max-age=3600` : GitHub/navigateurs servent la version cachée pendant 1h sans rappeler la fonction
- `stale-while-revalidate=86400` : pendant 24h après expiration, sert le cache périmé le temps de régénérer en arrière-plan (zéro latence perçue)
- Les erreurs (bloc `catch`) gardent un status 500 sans cache — comportement intentionnel

- [ ] **Step 2: Vérifier visuellement le fichier**

S'assurer que le fichier `site/app/svg_card/route.tsx` ressemble à :

```tsx
return new Response(svg, {
    headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
});
```

Et que le bloc `catch` est inchangé (status 500, pas de Cache-Control).

- [ ] **Step 3: Tester en local**

```bash
cd site && npm run dev
```

Dans un autre terminal :

```bash
curl -I "http://localhost:3000/svg_card?public_handle=<un_handle_codingame>"
```

Expected: headers de réponse contiennent `cache-control: public, max-age=3600, stale-while-revalidate=86400`

- [ ] **Step 4: Commit**

```bash
git add site/app/svg_card/route.tsx
git commit -m "perf: add Cache-Control header to svg_card route"
```

---

## Vérification

- `curl -I` sur la route `/svg_card` retourne le header `Cache-Control`
- La carte SVG s'affiche toujours correctement dans un navigateur
- Les erreurs (handle inexistant) retournent toujours un 500 sans cache
