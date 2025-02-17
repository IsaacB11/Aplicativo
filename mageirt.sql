PGDMP                     	    {            magerit    11.21    11.21      &           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false            '           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false            (           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                       false            )           1262    16482    magerit    DATABASE     �   CREATE DATABASE magerit WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Spanish_Colombia.1252' LC_CTYPE = 'Spanish_Colombia.1252';
    DROP DATABASE magerit;
             postgres    false            �            1259    16483    activo    TABLE     �  CREATE TABLE public.activo (
    id integer NOT NULL,
    nombre character varying NOT NULL,
    descripcion character varying NOT NULL,
    tipo_activo character varying NOT NULL,
    confidencialidad character varying,
    integridad character varying,
    disponibilidad character varying,
    trazabilidad character varying,
    autenticidad character varying,
    valor integer
);
    DROP TABLE public.activo;
       public         postgres    false            �            1259    16525    activo_proceso    TABLE     �   CREATE TABLE public.activo_proceso (
    id_activo integer,
    id_proceso integer,
    id integer NOT NULL,
    id_amenaza integer,
    confidencialidad integer,
    integridad integer,
    disponibilidad integer,
    id_tipo_amenaza integer
);
 "   DROP TABLE public.activo_proceso;
       public         postgres    false            �            1259    16523    activo_proceso_id_seq    SEQUENCE     �   CREATE SEQUENCE public.activo_proceso_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.activo_proceso_id_seq;
       public       postgres    false    202            *           0    0    activo_proceso_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.activo_proceso_id_seq OWNED BY public.activo_proceso.id;
            public       postgres    false    201            �            1259    16510    amenza    TABLE     s   CREATE TABLE public.amenza (
    id integer NOT NULL,
    nombre character varying,
    id_tipo_amenaza integer
);
    DROP TABLE public.amenza;
       public         postgres    false            �            1259    16493    process    TABLE     X   CREATE TABLE public.process (
    usuario character varying,
    id integer NOT NULL
);
    DROP TABLE public.process;
       public         postgres    false            �            1259    16491    process_id_seq    SEQUENCE     �   CREATE SEQUENCE public.process_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.process_id_seq;
       public       postgres    false    198            +           0    0    process_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.process_id_seq OWNED BY public.process.id;
            public       postgres    false    197            �            1259    16502    tipo_amenaza    TABLE     \   CREATE TABLE public.tipo_amenaza (
    id integer NOT NULL,
    nombre character varying
);
     DROP TABLE public.tipo_amenaza;
       public         postgres    false            �
           2604    16528    activo_proceso id    DEFAULT     v   ALTER TABLE ONLY public.activo_proceso ALTER COLUMN id SET DEFAULT nextval('public.activo_proceso_id_seq'::regclass);
 @   ALTER TABLE public.activo_proceso ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    202    201    202            �
           2604    16496 
   process id    DEFAULT     h   ALTER TABLE ONLY public.process ALTER COLUMN id SET DEFAULT nextval('public.process_id_seq'::regclass);
 9   ALTER TABLE public.process ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    197    198    198                      0    16483    activo 
   TABLE DATA               �   COPY public.activo (id, nombre, descripcion, tipo_activo, confidencialidad, integridad, disponibilidad, trazabilidad, autenticidad, valor) FROM stdin;
    public       postgres    false    196   �$       #          0    16525    activo_proceso 
   TABLE DATA               �   COPY public.activo_proceso (id_activo, id_proceso, id, id_amenaza, confidencialidad, integridad, disponibilidad, id_tipo_amenaza) FROM stdin;
    public       postgres    false    202   �-       !          0    16510    amenza 
   TABLE DATA               =   COPY public.amenza (id, nombre, id_tipo_amenaza) FROM stdin;
    public       postgres    false    200   .                 0    16493    process 
   TABLE DATA               .   COPY public.process (usuario, id) FROM stdin;
    public       postgres    false    198   "1                  0    16502    tipo_amenaza 
   TABLE DATA               2   COPY public.tipo_amenaza (id, nombre) FROM stdin;
    public       postgres    false    199   ?1       ,           0    0    activo_proceso_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.activo_proceso_id_seq', 1, false);
            public       postgres    false    201            -           0    0    process_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.process_id_seq', 1, false);
            public       postgres    false    197            �
           2606    16490    activo activo_pk 
   CONSTRAINT     N   ALTER TABLE ONLY public.activo
    ADD CONSTRAINT activo_pk PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.activo DROP CONSTRAINT activo_pk;
       public         postgres    false    196            �
           2606    16530     activo_proceso activo_proceso_pk 
   CONSTRAINT     ^   ALTER TABLE ONLY public.activo_proceso
    ADD CONSTRAINT activo_proceso_pk PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.activo_proceso DROP CONSTRAINT activo_proceso_pk;
       public         postgres    false    202            �
           2606    16517    amenza amenza_pk 
   CONSTRAINT     N   ALTER TABLE ONLY public.amenza
    ADD CONSTRAINT amenza_pk PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.amenza DROP CONSTRAINT amenza_pk;
       public         postgres    false    200            �
           2606    16501    process process_pk 
   CONSTRAINT     P   ALTER TABLE ONLY public.process
    ADD CONSTRAINT process_pk PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.process DROP CONSTRAINT process_pk;
       public         postgres    false    198            �
           2606    16509    tipo_amenaza tipo_amenaza_pk 
   CONSTRAINT     Z   ALTER TABLE ONLY public.tipo_amenaza
    ADD CONSTRAINT tipo_amenaza_pk PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.tipo_amenaza DROP CONSTRAINT tipo_amenaza_pk;
       public         postgres    false    199            �
           2606    16531 *   activo_proceso activo_proceso_activo_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.activo_proceso
    ADD CONSTRAINT activo_proceso_activo_id_fk FOREIGN KEY (id_activo) REFERENCES public.activo(id);
 T   ALTER TABLE ONLY public.activo_proceso DROP CONSTRAINT activo_proceso_activo_id_fk;
       public       postgres    false    202    2710    196            �
           2606    16541 *   activo_proceso activo_proceso_amenza_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.activo_proceso
    ADD CONSTRAINT activo_proceso_amenza_id_fk FOREIGN KEY (id_amenaza) REFERENCES public.amenza(id);
 T   ALTER TABLE ONLY public.activo_proceso DROP CONSTRAINT activo_proceso_amenza_id_fk;
       public       postgres    false    2716    200    202            �
           2606    16536 +   activo_proceso activo_proceso_process_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.activo_proceso
    ADD CONSTRAINT activo_proceso_process_id_fk FOREIGN KEY (id_proceso) REFERENCES public.process(id);
 U   ALTER TABLE ONLY public.activo_proceso DROP CONSTRAINT activo_proceso_process_id_fk;
       public       postgres    false    198    2712    202            �
           2606    16546 0   activo_proceso activo_proceso_tipo_amenaza_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.activo_proceso
    ADD CONSTRAINT activo_proceso_tipo_amenaza_id_fk FOREIGN KEY (id_tipo_amenaza) REFERENCES public.tipo_amenaza(id);
 Z   ALTER TABLE ONLY public.activo_proceso DROP CONSTRAINT activo_proceso_tipo_amenaza_id_fk;
       public       postgres    false    202    2714    199            �
           2606    16518     amenza amenza_tipo_amenaza_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.amenza
    ADD CONSTRAINT amenza_tipo_amenaza_id_fk FOREIGN KEY (id_tipo_amenaza) REFERENCES public.tipo_amenaza(id);
 J   ALTER TABLE ONLY public.amenza DROP CONSTRAINT amenza_tipo_amenaza_id_fk;
       public       postgres    false    2714    200    199               	  x��X�r�8>CO��i�ʙ�Dɉ�����V&q���ڪ�@$$#!@*Q�&�9�0�GЋ����d;Q���'�D�����c�R-����C�F�F�T^��XU�+�t����V����h�e���R�}p8�;E�~(��R2h���w���E���s�h��3��LL�t4��uW�j��̸$����u�(;���n���:��E����||Тa��TQkB�Uc��@@2��f���P��ܧ?j�L�s�U��~�t��&�k�rDD�B�Qk��1��ͤ5ڑ�ʍ�\���#�l�Z`�e�67��1## �S�p�Z��K�(
�zȘM[(���#��h�,u/nl��y�[IU޸��C	t�=�BV$��&!�^ߓ&)H�=��s�H=E�!����b�������]0�]��ͽFC�^��G�T��y�UY쌪�o�ltn]�V&W]yU�[y�C2:o��������1��><��YW5T�?_�A��9*��^�
��M�M���Ü��
MyB0K�u��Z#f�o��)cq�������b����m�̏�Ǽl2_�6>�{.��u#���� '� Ɣ2 P�R�E��D�jr�[6�����a���o�{�N<*��B�0G@��[.�d�3q^���x��q+��@�1�d⊥ѣF��h�Z*DO�!�r3�*������չ�O�v6џ\UK��A��?U��n�����-Jk��a�[4�04%z����,"@�xD��i��^���V�?�_��X�����3cQ�>(��!ӝ�VN.�4��AilѢF����m��aN(�^A�ow� ��=9�oI,�ḩ(��Xl2����aM&S��~���rg�S9"�B�@�2('��h|�lJ�7����תFt�m��T|�I��2-Y��L"��{W�w�~E�]�JmW�z�!C�ƳD�ՠ�#͝��>o�JB���eE\hS�:�c����'�Ҥˡ�p�ި�l�Јq�r�ˣ�1�&�R^�s�Z��uCiʵ��u��ZS�e_��?ppQAH+�����?�!�Q�#�p�@B�J舥a�Y���H���g�n^j�*����f���������SbF���x���y�X+cע�O��7=��$�O�g��~�:Ƹ'wuha��6;���Ĺ�D7��Jv�?������@ q�x�,Pű�j}b��KvY]�.��5*Ğ�X�ei��x?�yi�wد�{�"�� �c�\���M����GE��OT�¬�T~w�m�@����YF�   k�n�P�O�����2��K��PN��H���L�G�Oҍ�%�(eݓHŁ��w+j��.2��h2ʈ�Ǒ�9tl���$��^�bPi�S����E���;>;���7P!�!�=��IG;0=s��Shz��fųD�U�_�Or�5b���~�Eݠ.p�Pqc�1�);��Q�@��~V�p�r�u�tL��D_,�Xײ޵���%�J���\s�n�;{��ͽ��,U)�p�3X��D�Iv�/�(_������	t̆:�+m��}WQ:v���ΡSqM���0%���
�'i�L��A�"<�'M��[�	
K�Ő�t����� ~�Ь'���&.�s� ܌2Q%t��`*)\���zWB^G��8;�~h5>�2�*q��в�~7�b��o�հk��3q�#���v�:��K�T\�'T_�:�F.]�r<4\�m��c�g	A�;ʰ�@ ���ݎ�"->���z�T|�(�`��<"ZC����x��.�?r2��h�_�&���7sx�]�wo�Y&n>�&��s�.�x��q2�˫[���%�a�i��_F��M��;0�Љ���Q�T`���m���)���5|���К���h��L�Nw��j����t�,��i*䷷ש?2U��)Z���=�4D�4�����l��L(y�I{M�>��<$T�N^��>���O�"	���Ґ�^K�%�m��7�s11���Sp0A��R���4��n�m8m>��yw���x�&m��?^�_��C��Ư|[G��^xt�<k���@u�5�K��U�~�(�_W�F���I���e̓p�g�l�8��'��}�T�p�[�"&\�b���JT@���:��ń8��a��oڦt��O���z���(�X��Mi� ��p���=���_��\���.v��㫝�փ��
K�*w3J�)�X�t�M���Ksc��0 J�^�.��t��>%��N2��l�Zz������T�"�>?Ν#r�19{�"5{�^���$�q1�	g2��O���?�%�8      #      x������ � �      !     x��T=��8��_�2�,[�zK#��$�.�,5�2�H�}����)R�	�cyCj7ڍq�䛏��q�*q�US�����X�>��'��F����Ӧc7q�e;����o!�j�^z7�`is���59�����[�(0P�x*��:�8��Q�q����G������G�`�H&��1!��H����X0�J�uF�XHP�:QGQrO<�hJ���>�Q'Q�zE�z�D'	���C%� ��/HBi8���O��b͑!$��Q7���m%֏B,�Hv ��A�܄%�8�0� IӪہ���R��W�4���s�8Z�bt	��fv�6J]�#�DԦj����nfD��_�ޙ	s�<�za}�����(��������T��8B��x8��C�|��jԍ9�� X���
�|h��zY'0�e��Y"�K�������Dg<n��b�3-��G��4�w���~��s��QOk��k��}����$1��������m���Fϵn��J�K�%t��e>9�Ly���u�K1�o�i��C�cƬ��@8��d���ϴ i��g#�&b��	�Sݟ��;u�=HiJ�x]�|����bu���_���G�1u��u�Śǅˁ�/8��I4nW���1/����_2��6ؼ�l�� 6�v�c Ѩm/��?&3����f��RŲ��q����|�h}L�WsϰX�߫7:�[��`z���:G|�;c̓��#�v�n��\��e� Kݔ%�,Dܿ�����x�Ok            x������ � �          T   x�3�tI-N,.)J-V�K,)-J�I-�2�*�e���)d楔�3s��9����Լ����Ĕ�b.Nǒ��R�nT�=... ���     