# -*- coding: utf-8 -*-
"""Genera js/_temas-titulos.generated.json con titulo_es + temas para los 101 papers.
Mapeo curado a mano (español de Argentina, fiel; temas = 1-3 slugs de la taxonomía)."""
import json, os, sys

VALID = {'campos-em','agua-h2','mitocondria','luz','quantum','fascia','biocampo',
         'longevidad','neuro','sueno','dolor','antioxidantes','microbioma'}

# id: (titulo_es, [temas], title_en_override opcional)
M = {
 # ── BASE: LifeWave ──
 'lw-01': ("Caracterización del efecto de la energía emitida por los parches LifeWave sobre el ADN humano", ['campos-em','quantum']),
 'lw-02': ("Estudio aleatorizado controlado con placebo sobre los efectos de IceWave® en la reducción del dolor", ['dolor']),
 'lw-03': ("Estudio abierto de dolor que compara IceWave® con distintos analgésicos", ['dolor']),
 'lw-04': ("Estudio clínico piloto en humanos — parche de glutatión de LifeWave", ['antioxidantes']),
 'lw-05': ("Efectos de los parches Silent Nights® de LifeWave sobre la calidad del sueño", ['sueno']),
 'lw-06': ("Tratamiento del insomnio mediante la activación energética de puntos de acupuntura — RCT doble ciego", ['sueno']),
 'lw-07': ("Análisis de la variabilidad de la frecuencia cardíaca con los parches Aeon de LifeWave", ['sueno']),
 'lw-08': ("Eficacia del parche Energy de LifeWave sobre la flexibilidad y la fuerza", ['mitocondria']),
 'lw-09': ("Eficacia del parche de carnosina de LifeWave en flexibilidad, fuerza y resistencia", ['antioxidantes','mitocondria']),
 'lw-10': ("El parche SP6 Complete mejora la función de los órganos", ['microbioma']),
 'lw-11': ("El parche no transdérmico ALAVIDA mejora el estado funcional celular", ['longevidad','antioxidantes']),
 'lw-12': ("Efecto de un parche de superficie no transdérmico sobre la función mitocondrial", ['mitocondria']),
 'lw-13': ("El efecto del GHK-Cu sobre la expresión génica relevante para la función del sistema nervioso y el deterioro cognitivo", ['longevidad','neuro']),
 'lw-14': ("Mecanismos y aplicaciones de los efectos antiinflamatorios de la fotobiomodulación", ['luz','dolor']),
 # ── BASE: MyVitalC ──
 'mvc-01': ("La prolongación de la vida de ratas mediante la administración oral repetida de fulereno [60]", ['longevidad','antioxidantes']),
 'mvc-02': ("Fulerenos en biología y medicina", ['antioxidantes','longevidad']),
 # ── BASE: DrinkHRW ──
 'drh-01': ("Hidrógeno molecular: un gas medicinal preventivo y terapéutico para diversas enfermedades", ['agua-h2','antioxidantes']),
 'drh-02': ("Efectos del agua rica en hidrógeno sobre el rendimiento de resistencia muscular y la recuperación de la fatiga", ['agua-h2','mitocondria']),
 'drh-03': ("Efectos biológicos beneficiosos y mecanismos del hidrógeno molecular — 321 artículos originales", ['agua-h2','antioxidantes','neuro']),
 'drh-04': ("Eficacia del agua rica en hidrógeno sobre el estado antioxidante en el síndrome metabólico potencial", ['agua-h2','antioxidantes','microbioma']),
 'drh-05': ("Efectos del agua rica en hidrógeno sobre las alteraciones de un modelo de síndrome metabólico en ratas SHR", ['agua-h2','microbioma']),
 'drh-06': ("Ensayo cruzado aleatorizado doble ciego controlado con placebo de agua enriquecida con H₂ para miopatías mitocondriales e inflamatorias", ['agua-h2','mitocondria']),
 # ── BASE: Analemma ──
 'ana-01': ("Efecto del agua Analemma sobre la producción mitocondrial de ATP: ensayo doble ciego controlado con placebo", ['agua-h2','mitocondria']),
 'ana-02': ("Efecto del agua Analemma sobre la diversidad del microbioma intestinal: ensayo doble ciego controlado con placebo", ['agua-h2','microbioma']),
 'ana-03': ("Zona de exclusión y estructura heterogénea del agua a temperatura ambiente", ['agua-h2']),
 # ── BASE: Gamma 40Hz ──
 'gam-01': ("Seguridad, tolerabilidad y estimación de eficacia de la oscilación gamma evocada en la enfermedad de Alzheimer leve-moderada", ['neuro']),
 'gam-02': ("Estimulación sensorial en frecuencia gamma en demencia de Alzheimer leve probable: estudio de factibilidad", ['neuro']),
 'gam-03': ("Seguridad, tolerabilidad y eficacia preliminar de la estimulación sensorial de 40 Hz para la enfermedad de Alzheimer", ['neuro']),
 'gam-04': ("El parpadeo crónico de LED a 40 Hz no logró reducir la carga de amiloide en el modelo de ratón 5XFAD", ['neuro','luz']),
 'gam-05': ("Avances en la investigación sobre la estimulación sensorial de 40 Hz para la enfermedad de Alzheimer — revisión", ['neuro']),
 'gam-06': ("Fotobiomodulación en modelos experimentales de la enfermedad de Alzheimer: estado del arte", ['luz','neuro']),
 'gam-07': ("Respuestas auditivas de estado estable a 40 Hz y procesamiento de información compleja", ['neuro']),
 'gam-08': ("Efectos de los pulsos binaurales en frecuencia gamma sobre la atención y la ansiedad", ['neuro']),
 # ── BASE: Neuro Gum ──
 'ng-01': ("Cafeína y funciones cognitivas en el deporte: revisión sistemática y metaanálisis", ['neuro']),
 'ng-02': ("El efecto de la L-teanina sobre el rendimiento cognitivo: revisión sistemática y metaanálisis", ['neuro']),
 'ng-03': ("La L-teanina y la cafeína mejoran el cambio de tarea pero no la atención intersensorial", ['neuro']),
 'ng-04': ("Efectos de la cafeína y la L-teanina sobre el flujo sanguíneo cerebral, la cognición y el estado de ánimo", ['neuro']),
 'ng-05': ("Passiflora incarnata en los trastornos neuropsiquiátricos — revisión sistemática", ['neuro','sueno']),
 'ng-06': ("Infusión de Passiflora incarnata sobre la calidad subjetiva del sueño — RCT doble ciego", ['sueno']),
 'ng-07': ("Efecto de la manzanilla oral sobre la calidad del sueño en adultos mayores — ensayo controlado aleatorizado", ['sueno']),
 'ng-08': ("Suplementación con GABA, variabilidad de la frecuencia cardíaca, eficiencia del sueño y depresión: RCT", ['sueno','neuro']),
 'ng-09': ("Efecto de la suplementación con vitamina D sobre la depresión: revisión sistemática y metaanálisis", ['neuro']),
 'ng-10': ("Suplementación con vitamina B sobre la cognición, la depresión y la ansiedad: revisión sistemática", ['neuro']),
 # ── EXTRA: OPTIMIZE ──
 'extra-binhi-2023': ("Amplificación estadística de los efectos de los campos magnéticos débiles sobre la traducción celular", ['campos-em','quantum']),
 'extra-vanhuizen-2019-magnetic-stemcells': ("Los campos magnéticos débiles alteran el crecimiento mediado por células madre", ['campos-em','dolor']),
 'extra-usselman-2016-quantum-ros': ("La biología cuántica de la partición de las especies reactivas de oxígeno impacta en la bioenergética celular", ['quantum','campos-em','antioxidantes']),
 'extra-zlenko-2023-magnetic-dna-synthesis': ("Influencia del campo magnético y el spin nuclear sobre la velocidad de síntesis del ADN", ['campos-em','quantum']),
 'extra-mo-2013-magnetic-shielding-neuroblastoma': ("El blindaje magnético acelera la proliferación de células de neuroblastoma humano al promover la progresión de la fase G1", ['campos-em']),
 'extra-zadehhaghighi-2022-radical-pair-magnetic-biology': ("Efectos del campo magnético en biología desde la perspectiva del mecanismo de pares de radicales", ['campos-em','quantum']),
 'extra-chae-2022-human-magnetic-sense': ("El sentido magnético humano está mediado por un mecanismo de resonancia dependiente de luz y campo magnético", ['campos-em','quantum','luz']),
 'extra-bennett-onyango-2021-tunneling-brain-mitochondria': ("Energía, entropía y túnel cuántico de protones y electrones en las mitocondrias cerebrales", ['quantum','mitocondria']),
 'extra-bono-2012-coherent-structure-liquid-water': ("Emergencia de la estructura coherente del agua líquida", ['agua-h2','quantum']),
 'extra-li-pollack-2023-blood-circulation-beyond-heart': ("Sobre el motor de la circulación sanguínea más allá del corazón", ['agua-h2','luz']),
 'extra-lebaron-2022-electrolyzed-reduced-water-h2': ("Agua reducida por electrólisis: Revisión I. El hidrógeno molecular es el único agente responsable de los efectos terapéuticos", ['agua-h2','antioxidantes']),
 'extra-barancik-2020-molecular-hydrogen-cardiovascular-cns': ("Mecanismos moleculares y celulares asociados a los efectos del hidrógeno molecular en los sistemas cardiovascular y nervioso central", ['agua-h2','antioxidantes','neuro']),
 'extra-kang-2011-hydrogen-rich-water-liver-radiotherapy': ("Efectos de beber agua rica en hidrógeno sobre la calidad de vida de pacientes tratados con radioterapia por tumores hepáticos", ['agua-h2','antioxidantes']),
 'extra-zheng-2016-molecular-hydrogen-sepsis-organ-damage': ("La terapia con hidrógeno molecular reduce el daño orgánico inducido por sepsis", ['agua-h2','antioxidantes']),
 'extra-yildiz-2025-molecular-hydrogen-nutrition-review': ("Revisión integral del hidrógeno molecular como nueva terapia nutricional para aliviar el estrés oxidativo y las enfermedades: mecanismos y perspectivas", ['agua-h2','antioxidantes']),
 'extra-timofejeva-2021-heart-rhythm-magnetic-field': ("Estudio global de la sincronización del ritmo cardíaco humano con el campo magnético variable de la Tierra", ['campos-em','biocampo'], "Global Study of Human Heart Rhythm Synchronization with the Earth's Time-Varying Magnetic Field"),
 'extra-timofejeva-2017-group-sync-magnetic-field': ("Identificación de la sincronización fisiológica de un grupo con el campo magnético de la Tierra", ['campos-em','biocampo'], "Identification of a Group's Physiological Synchronization with the Earth's Magnetic Field"),
 'extra-wang-2019-geomagnetic-brain-alpha': ("Transducción del campo geomagnético evidenciada por la actividad de banda alfa en el cerebro humano", ['campos-em','neuro'], "Transduction of the Geomagnetic Field as Evidenced from Alpha-band Activity in the Human Brain"),
 'extra-chevalier-2012-earthing-revision': ("Earthing: implicaciones para la salud de reconectar el cuerpo humano con los electrones de la superficie terrestre", ['campos-em','antioxidantes']),
 'extra-li-pollack-2020-flujo-inducido-superficie-ir-ez': ("Flujo inducido por superficie: un motor microscópico natural que usa la energía infrarroja como combustible", ['agua-h2','luz']),
 'extra-powner-2024-luz-roja-mitocondria-glucosa': ("La estimulación lumínica de las mitocondrias reduce los niveles de glucosa en sangre", ['luz','mitocondria']),
 'extra-cheng-2023-hidrogeno-mitocondria-keap1-nrf2': ("Hidrógeno: una estrella emergente de la medicina de gases como nutriente dirigido a la mitocondria mediante la activación del sistema antioxidante Keap1-Nrf2", ['agua-h2','mitocondria','antioxidantes']),
 'extra-zhang-2023-mitocondria-hidrogeno-molecular-funciones': ("Mitocondrias: uno de los centros vitales de las funciones biológicas del hidrógeno molecular", ['agua-h2','mitocondria']),
 'extra-oschman-2015-grounding-inflamacion-cicatrizacion-revision': ("Los efectos del grounding (earthing) sobre la inflamación, la respuesta inmune, la cicatrización y la prevención y el tratamiento de enfermedades inflamatorias crónicas y autoinmunes", ['campos-em','dolor','antioxidantes']),
 'extra-waisberg-2024-luz-nir-roja-mitocondria-sans': ("La terapia con luz roja/infrarroja cercana como posible contramedida para la disfunción mitocondrial en el síndrome neuro-ocular asociado a los vuelos espaciales (SANS)", ['luz','mitocondria']),
 'extra-becker-1972-estimulacion-electrica-regeneracion-extremidades-mamiferos': ("Estimulación eléctrica de la regeneración parcial de extremidades en mamíferos", ['campos-em','dolor']),
 'extra-chevalier-2014-grounding-flujo-sanguineo-facial-rct': ("El grounding del cuerpo humano mejora la regulación del flujo sanguíneo facial: estudio piloto aleatorizado controlado con placebo", ['campos-em']),
 'extra-zadro-2022-reiki-mental-health': ("¿El Reiki beneficia los síntomas de salud mental por encima del placebo?", ['biocampo']),
 'extra-tabatabaee-2016-therapeutic-touch-cancer': ("Efecto del Toque Terapéutico sobre los parámetros relacionados con el dolor en pacientes con cáncer: ensayo clínico aleatorizado", ['biocampo','dolor']),
 'extra-valenti-2024-sound-matrix-mitochondria': ("La matriz del sonido modela la materia viva: de los macrosistemas al microambiente celular, donde las mitocondrias actúan como portales de energía al detectar y procesar las vibraciones sonoras", ['biocampo','mitocondria']),
 'extra-toppi-2016-eeg-hyperscanning-cooperation': ("Investigación del comportamiento cooperativo en entornos ecológicos: un estudio de hiperescaneo por EEG", ['biocampo','neuro']),
 'extra-dedic-2021-hyaluronan-orders-water': ("El hialuronano ordena las moléculas de agua en sus capas de hidratación extendidas a nanoescala", ['agua-h2','fascia']),
 'extra-cosic-2016-luz-resonancias-em-biomoleculas': ("La luz ambiental y su relación con las resonancias electromagnéticas de las interacciones biomoleculares, según el Modelo de Reconocimiento Resonante", ['campos-em','luz','quantum']),
 'extra-schwartz-2010-integrinas-matriz-mecanotransduccion': ("Integrinas y matriz extracelular en la mecanotransducción", ['fascia']),
 'extra-fischer-2018-mitocondria-puntos-gatillo-miofasciales': ("Evaluación de la función mitocondrial en puntos gatillo miofasciales crónicos — estudio piloto de cohorte prospectivo con respirometría de alta resolución", ['fascia','mitocondria','dolor']),
 'extra-vodyanoy-2015-sistema-primo-vascular-bong-han-kim': ("El sistema primo-vascular según lo presentó Bong Han Kim", ['biocampo','fascia']),
 'extra-hoyle-2017-actina-circadiana-cicatrizacion': ("La dinámica circadiana de la actina impulsa la movilización rítmica de los fibroblastos durante la cicatrización", ['fascia','dolor']),
 'extra-alvarez-lorenzo-2023-piezoelectricidad-regeneracion-tejidos': ("Andamios emisores de estímulos físicos: el papel de la piezoelectricidad en la regeneración de tejidos", ['campos-em','dolor']),
 'extra-demine-2019-desacople-mitocondrial': ("Desacople mitocondrial: un controlador clave de los procesos biológicos en la fisiología y las enfermedades", ['mitocondria']),
 'extra-clemente-suarez-2023-transferencia-mitocondrial': ("La transferencia mitocondrial como nuevo enfoque terapéutico en el diagnóstico y tratamiento de enfermedades", ['mitocondria','dolor']),
 'extra-chung-2017-biogenesis-mitocondrial-ejercicio-frio': ("Los efectos del ejercicio y la exposición al frío sobre la biogénesis mitocondrial en el músculo esquelético y el tejido adiposo blanco", ['mitocondria']),
 'extra-liu-2021-transferencia-mitocondrial-revitalizacion-tejidos': ("La transferencia mitocondrial intercelular como medio de revitalización tisular", ['mitocondria','dolor']),
 'extra-marie-2018-espectro-luz-estres-oxidativo-mitocondria-rpe': ("Espectro de acción de la luz sobre el estrés oxidativo y el daño mitocondrial en células del epitelio pigmentario retiniano cargadas con A2E", ['luz','mitocondria','antioxidantes']),
 'extra-aguda-2023-nir-ros-citoquinas-spike': ("La exposición a luz infrarroja cercana desencadena ROS que regulan a la baja las citoquinas inflamatorias inducidas por la proteína Spike del SARS-CoV-2 en cultivo de células humanas", ['luz','antioxidantes','mitocondria']),
 'extra-vanwijk-2013-emision-fotonica-artritis-raton': ("Imagenología de la emisión ultradébil de fotones en un modelo de artritis reumatoide en ratón", ['biocampo','luz']),
 'extra-vanwijk-2020-emision-fotonica-mitocondria-revision': ("Integración del análisis de la emisión ultradébil de fotones en la investigación mitocondrial", ['biocampo','luz','mitocondria']),
 'extra-wunsch-2014-luz-roja-nir-piel-colageno-rct': ("Ensayo controlado para determinar la eficacia del tratamiento con luz roja e infrarroja cercana en la satisfacción del paciente y el aumento de la densidad de colágeno intradérmico", ['luz']),
 'extra-mccraty-2017-geomagnetismo-sistema-nervioso-autonomo': ("Sincronización de los ritmos del sistema nervioso autónomo humano con la actividad geomagnética", ['campos-em','biocampo','sueno']),
 'extra-yau-2021-exposicion-frio-autofagia-grasa-parda': ("La exposición crónica al frío induce autofagia para promover la oxidación de ácidos grasos, el recambio mitocondrial y la termogénesis en el tejido adiposo pardo", ['mitocondria']),
 'extra-jain-2015-biofield-estudios-clinicos': ("Estudios clínicos de las terapias de biocampo: resumen, desafíos metodológicos y recomendaciones", ['biocampo']),
 'extra-hammerschlag-2015-biofield-fisiologia': ("Fisiología del biocampo: un marco para una disciplina emergente", ['biocampo','campos-em']),
 'extra-fishburn-2018-sincronizacion-neural-interpersonal': ("Juntando nuestras cabezas: la sincronización neural interpersonal como mecanismo biológico de la intencionalidad compartida", ['biocampo','neuro']),
 'extra-goldstein-2018-acoplamiento-cerebro-dolor': ("El acoplamiento cerebro-a-cerebro durante el contacto de manos se asocia con la reducción del dolor", ['biocampo','neuro','dolor']),
 'extra-bartel-2021-vibracion-sonora-salud': ("Posibles mecanismos de los efectos de la vibración sonora sobre la salud humana", ['biocampo']),
 'extra-perry-2021-canto-ritmico-estados-misticos': ("El canto rítmico y los estados místicos a través de las tradiciones", ['biocampo']),
 'extra-pinna-2020-interocepcion-tono-vagal': ("Revisión sistemática de las asociaciones entre la interocepción, el tono vagal y la regulación emocional", ['biocampo','sueno']),
 'extra-he-2016-contagio-emocional-redes': ("Exploración de los patrones de arrastre de la emoción humana en las redes sociales", ['biocampo']),
 'extra-babcock-2024-superradiancia-triptofano': ("Superradiancia ultravioleta de megaredes de triptófano en arquitecturas biológicas", ['quantum','biocampo','luz']),
}

def main():
    here = os.path.dirname(os.path.abspath(__file__))
    out = {}
    for k, v in M.items():
        titulo, temas = v[0], v[1]
        entry = {'titulo_es': titulo, 'temas': temas}
        if len(v) >= 3 and v[2]:
            entry['title_en'] = v[2]
        out[k] = entry
    # validar
    assert len(out) == 101, f"esperaba 101, hay {len(out)}"
    for k, e in out.items():
        assert e['titulo_es'].strip(), f"titulo vacío en {k}"
        assert 1 <= len(e['temas']) <= 3, f"temas fuera de rango en {k}: {e['temas']}"
        assert all(t in VALID for t in e['temas']), f"slug inválido en {k}: {e['temas']}"
    path = os.path.join(here, '..', 'js', '_temas-titulos.generated.json')
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(out, f, ensure_ascii=False, indent=1)
    print(f"OK {len(out)} papers escritos en {os.path.normpath(path)}")

if __name__ == '__main__':
    main()
