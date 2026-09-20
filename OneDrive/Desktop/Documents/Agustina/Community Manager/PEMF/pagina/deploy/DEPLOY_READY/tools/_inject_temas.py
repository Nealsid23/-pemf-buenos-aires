# -*- coding: utf-8 -*-
"""Inyecta titulo_es + temas en las dos fuentes de papers, desde
js/_temas-titulos.generated.json. Idempotente.

  python tools/_inject_temas.py --target base    # array studies en page-estudios.js
  python tools/_inject_temas.py --target extra   # js/papers-extra.json
"""
import json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
DEPLOY = os.path.normpath(os.path.join(HERE, '..'))

def load_map():
    with open(os.path.join(DEPLOY, 'js', '_temas-titulos.generated.json'), encoding='utf-8') as f:
        return json.load(f)

def js_str(s):
    """String JS con comillas dobles, escapando lo imprescindible."""
    return '"' + s.replace('\\', '\\\\').replace('"', '\\"') + '"'

def inject_base(m):
    path = os.path.join(DEPLOY, 'js', 'page-estudios.js')
    src = open(path, encoding='utf-8').read()
    n = 0
    for pid, e in m.items():
        if not re.match(r'(lw|mvc|drh|ana|gam|ng)-', pid):
            continue  # solo ids base
        titulo = js_str(e['titulo_es'])
        temas = '[' + ','.join(js_str(t) for t in e['temas']) + ']'
        fields = f"titulo_es:{titulo},temas:{temas},"
        # ya inyectado -> reemplazar el bloque previo
        pat_done = re.compile(r"(\{id:'" + re.escape(pid) + r"',)titulo_es:\"(?:[^\"\\]|\\.)*\",temas:\[[^\]]*\],")
        pat_raw  = re.compile(r"(\{id:'" + re.escape(pid) + r"',)")
        if pat_done.search(src):
            src = pat_done.sub(r"\1" + fields.replace('\\', '\\\\'), src)
            n += 1
        elif pat_raw.search(src):
            src = pat_raw.sub(lambda mt: mt.group(1) + fields, src, count=1)
            n += 1
        else:
            print(f"  AVISO: id base no encontrado en JS: {pid}")
    open(path, 'w', encoding='utf-8').write(src)
    print(f"base: {n} papers inyectados en page-estudios.js")

def inject_extra(m):
    path = os.path.join(DEPLOY, 'js', 'papers-extra.json')
    raw = open(path, encoding='utf-8').read()
    d = json.loads(raw)
    n = 0
    for p in d.get('papers', []):
        e = m.get(p.get('id'))
        if not e:
            continue
        p['titulo_es'] = e['titulo_es']
        p['temas'] = e['temas']
        if e.get('title_en'):
            p['title'] = e['title_en']
        n += 1
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(d, f, ensure_ascii=False, indent=1)
        f.write('\n')
    print(f"extra: {n} papers inyectados en papers-extra.json")

def main():
    if '--target' not in sys.argv:
        print("uso: --target base|extra"); sys.exit(1)
    target = sys.argv[sys.argv.index('--target') + 1]
    m = load_map()
    if target == 'base':
        inject_base(m)
    elif target == 'extra':
        inject_extra(m)
    else:
        print("target inválido"); sys.exit(1)

if __name__ == '__main__':
    main()
