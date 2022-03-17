SELECT perfil.nombre, actorestrella.nombreactor, timpo_visto
FROM tiempovisto
INNER JOIN contenido ON contenido.idcontenido = tiempovisto.idcontenido
INNER JOIN perfil ON perfil.idperfil = tiempovisto.idperfil
INNER JOIN actorestrella ON actorestrella.actorid = contenido.actorestrella