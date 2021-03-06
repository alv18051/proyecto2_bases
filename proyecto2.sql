PGDMP         )                z            proyecto2_db    14.1    14.1 !    %           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            &           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            '           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            (           1262    25201    proyecto2_db    DATABASE     l   CREATE DATABASE proyecto2_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Spanish_Guatemala.1252';
    DROP DATABASE proyecto2_db;
                postgres    false            ?            1259    25282    actorestrella    TABLE     ?   CREATE TABLE public.actorestrella (
    actorid integer NOT NULL,
    nombreactor character varying(128),
    apodo character varying(80),
    fechadebut date
);
 !   DROP TABLE public.actorestrella;
       public         heap    postgres    false            ?            1259    25227 	   categoria    TABLE     f   CREATE TABLE public.categoria (
    categoriaid integer NOT NULL,
    nombre character varying(69)
);
    DROP TABLE public.categoria;
       public         heap    postgres    false            ?            1259    25297 	   contenido    TABLE     ?   CREATE TABLE public.contenido (
    idcontenido integer NOT NULL,
    tipo character varying(30),
    nombre character varying(80),
    categoria integer,
    actorestrella character varying(60),
    director character varying(60)
);
    DROP TABLE public.contenido;
       public         heap    postgres    false            ?            1259    25277    director    TABLE     ?   CREATE TABLE public.director (
    directorid integer NOT NULL,
    nombredirector character varying(128),
    apodo character varying(80),
    fechadebut date
);
    DROP TABLE public.director;
       public         heap    postgres    false            ?            1259    25232    genero    TABLE     `   CREATE TABLE public.genero (
    generoid integer NOT NULL,
    nombre character varying(70)
);
    DROP TABLE public.genero;
       public         heap    postgres    false            ?            1259    25222    perfil    TABLE     ?   CREATE TABLE public.perfil (
    idperfil integer NOT NULL,
    nombre character varying(30),
    lenguaje character varying(20),
    ratingmadurez character varying(5)
);
    DROP TABLE public.perfil;
       public         heap    postgres    false            ?            1259    25212    plan    TABLE     ?   CREATE TABLE public.plan (
    planid integer NOT NULL,
    userid integer NOT NULL,
    nombreplan character varying(30),
    limite integer
);
    DROP TABLE public.plan;
       public         heap    postgres    false            ?            1259    25302    premio    TABLE     u   CREATE TABLE public.premio (
    idpremio integer NOT NULL,
    numerogalardones integer,
    contenidoid integer
);
    DROP TABLE public.premio;
       public         heap    postgres    false            ?            1259    25207    usuario    TABLE     <  CREATE TABLE public.usuario (
    userid integer NOT NULL,
    correo character varying(80),
    user_name character varying(30),
    "contraseña" character varying(16),
    planid integer,
    fechanacimiento date,
    tarjeta bigint,
    fechaexp date,
    ccv integer,
    nombretitular character varying(80)
);
    DROP TABLE public.usuario;
       public         heap    postgres    false                       0    25282    actorestrella 
   TABLE DATA           P   COPY public.actorestrella (actorid, nombreactor, apodo, fechadebut) FROM stdin;
    public          postgres    false    215   `$                 0    25227 	   categoria 
   TABLE DATA           8   COPY public.categoria (categoriaid, nombre) FROM stdin;
    public          postgres    false    212   }$       !          0    25297 	   contenido 
   TABLE DATA           b   COPY public.contenido (idcontenido, tipo, nombre, categoria, actorestrella, director) FROM stdin;
    public          postgres    false    216   ?$                 0    25277    director 
   TABLE DATA           Q   COPY public.director (directorid, nombredirector, apodo, fechadebut) FROM stdin;
    public          postgres    false    214   ?$                 0    25232    genero 
   TABLE DATA           2   COPY public.genero (generoid, nombre) FROM stdin;
    public          postgres    false    213   ?$                 0    25222    perfil 
   TABLE DATA           K   COPY public.perfil (idperfil, nombre, lenguaje, ratingmadurez) FROM stdin;
    public          postgres    false    211   ?$                 0    25212    plan 
   TABLE DATA           B   COPY public.plan (planid, userid, nombreplan, limite) FROM stdin;
    public          postgres    false    210   %       "          0    25302    premio 
   TABLE DATA           I   COPY public.premio (idpremio, numerogalardones, contenidoid) FROM stdin;
    public          postgres    false    217   +%                 0    25207    usuario 
   TABLE DATA           ?   COPY public.usuario (userid, correo, user_name, "contraseña", planid, fechanacimiento, tarjeta, fechaexp, ccv, nombretitular) FROM stdin;
    public          postgres    false    209   H%       ?           2606    25286     actorestrella actorestrella_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public.actorestrella
    ADD CONSTRAINT actorestrella_pkey PRIMARY KEY (actorid);
 J   ALTER TABLE ONLY public.actorestrella DROP CONSTRAINT actorestrella_pkey;
       public            postgres    false    215            ?           2606    25231    categoria categoria_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.categoria
    ADD CONSTRAINT categoria_pkey PRIMARY KEY (categoriaid);
 B   ALTER TABLE ONLY public.categoria DROP CONSTRAINT categoria_pkey;
       public            postgres    false    212            ?           2606    25301    contenido contenido_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.contenido
    ADD CONSTRAINT contenido_pkey PRIMARY KEY (idcontenido);
 B   ALTER TABLE ONLY public.contenido DROP CONSTRAINT contenido_pkey;
       public            postgres    false    216            ?           2606    25281    director director_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.director
    ADD CONSTRAINT director_pkey PRIMARY KEY (directorid);
 @   ALTER TABLE ONLY public.director DROP CONSTRAINT director_pkey;
       public            postgres    false    214            ?           2606    25236    genero genero_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.genero
    ADD CONSTRAINT genero_pkey PRIMARY KEY (generoid);
 <   ALTER TABLE ONLY public.genero DROP CONSTRAINT genero_pkey;
       public            postgres    false    213            ?           2606    25226    perfil perfil_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.perfil
    ADD CONSTRAINT perfil_pkey PRIMARY KEY (idperfil);
 <   ALTER TABLE ONLY public.perfil DROP CONSTRAINT perfil_pkey;
       public            postgres    false    211            ~           2606    25216    plan plan_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.plan
    ADD CONSTRAINT plan_pkey PRIMARY KEY (planid, userid);
 8   ALTER TABLE ONLY public.plan DROP CONSTRAINT plan_pkey;
       public            postgres    false    210    210            ?           2606    25306    premio premio_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.premio
    ADD CONSTRAINT premio_pkey PRIMARY KEY (idpremio);
 <   ALTER TABLE ONLY public.premio DROP CONSTRAINT premio_pkey;
       public            postgres    false    217            |           2606    25211    usuario usuario_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (userid);
 >   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_pkey;
       public            postgres    false    209            ?           2606    25217    plan plan_userid_fkey    FK CONSTRAINT     y   ALTER TABLE ONLY public.plan
    ADD CONSTRAINT plan_userid_fkey FOREIGN KEY (userid) REFERENCES public.usuario(userid);
 ?   ALTER TABLE ONLY public.plan DROP CONSTRAINT plan_userid_fkey;
       public          postgres    false    209    210    3196            ?           2606    25307    premio premio_contenidoid_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.premio
    ADD CONSTRAINT premio_contenidoid_fkey FOREIGN KEY (contenidoid) REFERENCES public.contenido(idcontenido);
 H   ALTER TABLE ONLY public.premio DROP CONSTRAINT premio_contenidoid_fkey;
       public          postgres    false    216    217    3210                   x?????? ? ?            x?????? ? ?      !      x?????? ? ?            x?????? ? ?            x?????? ? ?            x?????? ? ?            x?????? ? ?      "      x?????? ? ?            x?????? ? ?     