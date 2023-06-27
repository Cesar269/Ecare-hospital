

DROP DATABASE Hospital
GO
CREATE DATABASE Hospital
GO
USE Hospital
GO

/****** Object:  Table [dbo].[Cita]    Script Date: 23/05/2023 11:39:25 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cita](
	[id_cita] [int] IDENTITY(1,1) NOT NULL,
	[notas] [text] NOT NULL,
	[fecha] [date] NOT NULL,
	[id_tipo_servicio] [int] NOT NULL,
	[id_consultorio] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id_cita] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Cita_Usuario]    Script Date: 23/05/2023 11:39:26 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cita_Usuario](
	[id_cita] [int] NOT NULL,
	[curp] [varchar](18) NOT NULL
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Consultorio]    Script Date: 23/05/2023 11:39:26 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Consultorio](
	[id_consultorio] [int] IDENTITY(1,1) NOT NULL,
	[id_horario] [int] NOT NULL,
	[curp_doctor] [varchar](18) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id_consultorio] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Especialidad]    Script Date: 23/05/2023 11:39:26 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Especialidad](
	[id_especialidad] [int] IDENTITY(1,1) NOT NULL,
	[especialidad] [varchar](30) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id_especialidad] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Especialidad_Usuario]    Script Date: 23/05/2023 11:39:26 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Especialidad_Usuario](
	[curp] [varchar](18) NOT NULL,
	[id_especialidad] [int] NOT NULL
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Historial_clinico]    Script Date: 23/05/2023 11:39:26 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Historial_clinico](
	[folio] [int] IDENTITY(1,1) NOT NULL,
	[paciente] [text] NOT NULL,
	[edad] [int] NOT NULL,
	[doctor] [text] NOT NULL,
	[especialidad] [text] NOT NULL,
	[diagnostico] [text] NOT NULL,
	[tratamiento] [text] NOT NULL,
	[fecha] [date] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[folio] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Horario]    Script Date: 23/05/2023 11:39:26 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Horario](
	[id_horario] [int] IDENTITY(1,1) NOT NULL,
	[horario] [varchar](11) NULL,
PRIMARY KEY CLUSTERED 
(
	[id_horario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Medicamento]    Script Date: 23/05/2023 11:39:26 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Medicamento](
	[id_medicamento] [int] IDENTITY(1,1) NOT NULL,
	[nombre_medicamento] [varchar](15) NOT NULL,
	[descripcion] [text] NOT NULL,
	[existencia] [bit] NOT NULL,
	[es_patente] [bit] NOT NULL,
	[id_presentacion] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id_medicamento] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Medicamento_Receta]    Script Date: 23/05/2023 11:39:26 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Medicamento_Receta](
	[id_receta] [int] NOT NULL,
	[id_medicamento] [int] NOT NULL
) ON [PRIMARY]
GO


/****** Object:  Table [dbo].[Ocupacion]    Script Date: 23/05/2023 11:39:26 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Ocupacion](
	[id_ocupacion] [int] IDENTITY(1,1) NOT NULL,
	[ocupacion] [varchar](30) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id_ocupacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Presentacion]    Script Date: 23/05/2023 11:39:26 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Presentacion](
	[id_presentacion] [int] IDENTITY(1,1) NOT NULL,
	[presentacion] [varchar](10) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id_presentacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Receta]    Script Date: 23/05/2023 11:39:26 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Receta](
	[id_receta] [int] IDENTITY(1,1) NOT NULL,
	[descripcion] [text] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id_receta] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Receta_Usuario]    Script Date: 23/05/2023 11:39:26 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Receta_Usuario](
	[id_receta] [int] NOT NULL,
	[curp] [varchar](18) NOT NULL
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Sexo]    Script Date: 23/05/2023 11:39:26 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sexo](
	[id_sexo] [int] IDENTITY(1,1) NOT NULL,
	[sexo] [varchar](7) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id_sexo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Tipo_servicio]    Script Date: 23/05/2023 11:39:26 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tipo_servicio](
	[id_tipo_servicio] [int] IDENTITY(1,1) NOT NULL,
	[tipo_servicio] [varchar](40) NOT NULL,
	[costo] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id_tipo_servicio] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Tipo_usuario]    Script Date: 23/05/2023 11:39:26 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tipo_usuario](
	[id_tipo_usuario] [int] IDENTITY(1,1) NOT NULL,
	[tipo_usuario] [varchar](15) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id_tipo_usuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Usuario]    Script Date: 23/05/2023 11:39:26 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuario](
	[curp] [varchar](18) NOT NULL,
	[correo] [text] NOT NULL,
	[password] [text] NOT NULL,
	[nombre] [varchar](20) NOT NULL,
	[ap_paterno] [varchar](20) NOT NULL,
	[ap_materno] [varchar](20) NOT NULL,
	[celular] [varchar](10) NULL,
	[edad] [int] NOT NULL,
	[id_sexo] [int] NOT NULL,
	[id_ocupacion] [int] NOT NULL,
	[id_tipo_usuario] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[curp] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

SET IDENTITY_INSERT [dbo].[Cita] ON 
INSERT [dbo].[Cita] ([id_cita], [notas], [fecha], [id_tipo_servicio], [id_consultorio]) VALUES (1, N'El paciente presenta síntomas de gripe y tos persistente. Se recomienda descanso y tomar medicamentos para aliviar los síntomas.', CAST(N'2023-05-25' AS Date), 5, 7)
INSERT [dbo].[Cita] ([id_cita], [notas], [fecha], [id_tipo_servicio], [id_consultorio]) VALUES (2, N'Se realizó una radiografía de tórax y se identificaron signos de neumonía. Se recetó un tratamiento de antibióticos.', CAST(N'2023-05-28' AS Date), 7, 12)
INSERT [dbo].[Cita] ([id_cita], [notas], [fecha], [id_tipo_servicio], [id_consultorio]) VALUES (3, N'Se programó una cirugía para corregir una hernia inguinal. Se requerirá un ayuno de 8 horas antes de la intervención.', CAST(N'2023-05-30' AS Date), 2, 8)
INSERT [dbo].[Cita] ([id_cita], [notas], [fecha], [id_tipo_servicio], [id_consultorio]) VALUES (4, N'El paciente requiere una evaluación de su presión ocular debido a antecedentes familiares de glaucoma.', CAST(N'2023-05-27' AS Date), 16, 5)
INSERT [dbo].[Cita] ([id_cita], [notas], [fecha], [id_tipo_servicio], [id_consultorio]) VALUES (5, N'Se realizará una ecografía abdominal para evaluar posibles trastornos en el hígado y la vesícula biliar.', CAST(N'2023-05-26' AS Date), 8, 6)
INSERT [dbo].[Cita] ([id_cita], [notas], [fecha], [id_tipo_servicio], [id_consultorio]) VALUES (6, N'El paciente presenta dolor en el pecho y dificultad para respirar. Se realizarán pruebas cardíacas para descartar problemas cardíacos.', CAST(N'2023-05-29' AS Date), 13, 10)
INSERT [dbo].[Cita] ([id_cita], [notas], [fecha], [id_tipo_servicio], [id_consultorio]) VALUES (7, N'El paciente requiere una limpieza dental de rutina y una evaluación de la salud bucal.', CAST(N'2023-05-25' AS Date), 3, 15)
INSERT [dbo].[Cita] ([id_cita], [notas], [fecha], [id_tipo_servicio], [id_consultorio]) VALUES (8, N'Se realizará una resonancia magnética para evaluar posibles lesiones en la columna vertebral.', CAST(N'2023-05-27' AS Date), 4, 1)
INSERT [dbo].[Cita] ([id_cita], [notas], [fecha], [id_tipo_servicio], [id_consultorio]) VALUES (9, N'El paciente necesita una receta para renovar su medicación crónica. Se realizará una revisión del estado de salud general.', CAST(N'2023-05-24' AS Date), 6, 14)
INSERT [dbo].[Cita] ([id_cita], [notas], [fecha], [id_tipo_servicio], [id_consultorio]) VALUES (10, N'El paciente requiere terapia física para rehabilitar una lesión en la rodilla.', CAST(N'2023-05-28' AS Date), 9, 11)
INSERT [dbo].[Cita] ([id_cita], [notas], [fecha], [id_tipo_servicio], [id_consultorio]) VALUES (11, N'Se realizó una evaluación psicológica y se determinó que el paciente puede beneficiarse de terapia individual.', CAST(N'2023-05-25' AS Date), 14, 4)
INSERT [dbo].[Cita] ([id_cita], [notas], [fecha], [id_tipo_servicio], [id_consultorio]) VALUES (12, N'El paciente necesita una consulta de control de la diabetes. Se realizará una medición de los niveles de glucosa en sangre.', CAST(N'2023-05-30' AS Date), 15, 3)
INSERT [dbo].[Cita] ([id_cita], [notas], [fecha], [id_tipo_servicio], [id_consultorio]) VALUES (13, N'Se realizará una prueba de esfuerzo para evaluar la condición física del paciente y detectar posibles problemas cardíacos.', CAST(N'2023-05-29' AS Date), 13, 9)
INSERT [dbo].[Cita] ([id_cita], [notas], [fecha], [id_tipo_servicio], [id_consultorio]) VALUES (14, N'El paciente necesita una evaluación de rutina para controlar la presión arterial y los niveles de colesterol.', CAST(N'2023-05-26' AS Date), 1, 6)
SET IDENTITY_INSERT [dbo].[Cita] OFF
GO

INSERT [dbo].[Cita_Usuario] ([id_cita], [curp]) VALUES (1, N'LOGJ900623MDFNNG07')
INSERT [dbo].[Cita_Usuario] ([id_cita], [curp]) VALUES (2, N'MERJ850523MDFNNJ07')
INSERT [dbo].[Cita_Usuario] ([id_cita], [curp]) VALUES (3, N'JICR840523MDFNNR10')
INSERT [dbo].[Cita_Usuario] ([id_cita], [curp]) VALUES (4, N'HEVL930523MDFNNL06')
INSERT [dbo].[Cita_Usuario] ([id_cita], [curp]) VALUES (5, N'CADK890523MDFNNK04')
INSERT [dbo].[Cita_Usuario] ([id_cita], [curp]) VALUES (6, N'MEGS840523MDFNNS10')
INSERT [dbo].[Cita_Usuario] ([id_cita], [curp]) VALUES (7, N'PARC950523MDFNND06')
INSERT [dbo].[Cita_Usuario] ([id_cita], [curp]) VALUES (8, N'RASP870523MDFNNP02')
INSERT [dbo].[Cita_Usuario] ([id_cita], [curp]) VALUES (9, N'REMA890523MDFNNR02')
INSERT [dbo].[Cita_Usuario] ([id_cita], [curp]) VALUES (10, N'HETG910523MDFNNG11')
INSERT [dbo].[Cita_Usuario] ([id_cita], [curp]) VALUES (11, N'RENP910523MDFNNP09')
INSERT [dbo].[Cita_Usuario] ([id_cita], [curp]) VALUES (12, N'GOFM850523MDFNNC03')
INSERT [dbo].[Cita_Usuario] ([id_cita], [curp]) VALUES (13, N'OEMA870523MDFNNA03')
INSERT [dbo].[Cita_Usuario] ([id_cita], [curp]) VALUES (14, N'MOGA920523MDFNND11')
GO

SET IDENTITY_INSERT [dbo].[Consultorio] ON 
INSERT [dbo].[Consultorio] ([id_consultorio], [id_horario], [curp_doctor]) VALUES (1, 11, N'FESM880101MYC')
INSERT [dbo].[Consultorio] ([id_consultorio], [id_horario], [curp_doctor]) VALUES (2, 7, N'GOLA900101MYC')
INSERT [dbo].[Consultorio] ([id_consultorio], [id_horario], [curp_doctor]) VALUES (3, 14, N'GUMD900101MYC')
INSERT [dbo].[Consultorio] ([id_consultorio], [id_horario], [curp_doctor]) VALUES (4, 5, N'HERR910101MYC')
INSERT [dbo].[Consultorio] ([id_consultorio], [id_horario], [curp_doctor]) VALUES (5, 10, N'LORS940101MYC')
INSERT [dbo].[Consultorio] ([id_consultorio], [id_horario], [curp_doctor]) VALUES (6, 6, N'MASA860101MYC')
INSERT [dbo].[Consultorio] ([id_consultorio], [id_horario], [curp_doctor]) VALUES (7, 9, N'MEGL890101MYC')
INSERT [dbo].[Consultorio] ([id_consultorio], [id_horario], [curp_doctor]) VALUES (8, 4, N'NARP870101MYC')
INSERT [dbo].[Consultorio] ([id_consultorio], [id_horario], [curp_doctor]) VALUES (9, 3, N'ORMJ960101MYC')
INSERT [dbo].[Consultorio] ([id_consultorio], [id_horario], [curp_doctor]) VALUES (10, 15, N'PIGG880101MYC')
INSERT [dbo].[Consultorio] ([id_consultorio], [id_horario], [curp_doctor]) VALUES (11, 13, N'RIPJ930101MYC')
INSERT [dbo].[Consultorio] ([id_consultorio], [id_horario], [curp_doctor]) VALUES (12, 8, N'ROLJ950101MYC')
INSERT [dbo].[Consultorio] ([id_consultorio], [id_horario], [curp_doctor]) VALUES (13, 16, N'TORC930101MYC')
INSERT [dbo].[Consultorio] ([id_consultorio], [id_horario], [curp_doctor]) VALUES (14, 12, N'VAGG890101MYC')
INSERT [dbo].[Consultorio] ([id_consultorio], [id_horario], [curp_doctor]) VALUES (15, 2, N'VAME950101MYC')
SET IDENTITY_INSERT [dbo].[Consultorio] OFF
GO

SET IDENTITY_INSERT [dbo].[Especialidad] ON 
INSERT [dbo].[Especialidad] ([id_especialidad], [especialidad]) VALUES (1, N'Cardiología')
INSERT [dbo].[Especialidad] ([id_especialidad], [especialidad]) VALUES (2, N'Dermatología')
INSERT [dbo].[Especialidad] ([id_especialidad], [especialidad]) VALUES (3, N'Endocrinología')
INSERT [dbo].[Especialidad] ([id_especialidad], [especialidad]) VALUES (4, N'Gastroenterología')
INSERT [dbo].[Especialidad] ([id_especialidad], [especialidad]) VALUES (5, N'Geriatría')
INSERT [dbo].[Especialidad] ([id_especialidad], [especialidad]) VALUES (6, N'Ginecología y Obstetricia')
INSERT [dbo].[Especialidad] ([id_especialidad], [especialidad]) VALUES (7, N'Hematología')
INSERT [dbo].[Especialidad] ([id_especialidad], [especialidad]) VALUES (8, N'Medicina Interna')
INSERT [dbo].[Especialidad] ([id_especialidad], [especialidad]) VALUES (9, N'Nefrología')
INSERT [dbo].[Especialidad] ([id_especialidad], [especialidad]) VALUES (10, N'Neumología')
INSERT [dbo].[Especialidad] ([id_especialidad], [especialidad]) VALUES (11, N'Neurología')
INSERT [dbo].[Especialidad] ([id_especialidad], [especialidad]) VALUES (12, N'Oftalmología')
INSERT [dbo].[Especialidad] ([id_especialidad], [especialidad]) VALUES (13, N'Oncología')
INSERT [dbo].[Especialidad] ([id_especialidad], [especialidad]) VALUES (14, N'Ortopedia y Traumatología')
INSERT [dbo].[Especialidad] ([id_especialidad], [especialidad]) VALUES (15, N'Otorrinolaringología')
INSERT [dbo].[Especialidad] ([id_especialidad], [especialidad]) VALUES (16, N'Pediatría')
INSERT [dbo].[Especialidad] ([id_especialidad], [especialidad]) VALUES (17, N'Psicología y Psiquiatría')
INSERT [dbo].[Especialidad] ([id_especialidad], [especialidad]) VALUES (18, N'Radiología')
INSERT [dbo].[Especialidad] ([id_especialidad], [especialidad]) VALUES (19, N'Reumatología')
INSERT [dbo].[Especialidad] ([id_especialidad], [especialidad]) VALUES (20, N'Urología')
SET IDENTITY_INSERT [dbo].[Especialidad] OFF
GO

INSERT [dbo].[Especialidad_Usuario] ([curp], [id_especialidad]) VALUES (N'FESM880101MYC', 17)
INSERT [dbo].[Especialidad_Usuario] ([curp], [id_especialidad]) VALUES (N'GOLA900101MYC', 18)
INSERT [dbo].[Especialidad_Usuario] ([curp], [id_especialidad]) VALUES (N'GUMD900101MYC', 8)
INSERT [dbo].[Especialidad_Usuario] ([curp], [id_especialidad]) VALUES (N'HERR910101MYC', 5)
INSERT [dbo].[Especialidad_Usuario] ([curp], [id_especialidad]) VALUES (N'LORS940101MYC', 1)
INSERT [dbo].[Especialidad_Usuario] ([curp], [id_especialidad]) VALUES (N'MASA860101MYC', 1)
INSERT [dbo].[Especialidad_Usuario] ([curp], [id_especialidad]) VALUES (N'MEGL890101MYC', 8)
INSERT [dbo].[Especialidad_Usuario] ([curp], [id_especialidad]) VALUES (N'NARP870101MYC', 8)
INSERT [dbo].[Especialidad_Usuario] ([curp], [id_especialidad]) VALUES (N'ORMJ960101MYC', 5)
INSERT [dbo].[Especialidad_Usuario] ([curp], [id_especialidad]) VALUES (N'PIGG880101MYC', 1)
INSERT [dbo].[Especialidad_Usuario] ([curp], [id_especialidad]) VALUES (N'RIPJ930101MYC', 18)
INSERT [dbo].[Especialidad_Usuario] ([curp], [id_especialidad]) VALUES (N'ROLJ950101MYC', 10)
INSERT [dbo].[Especialidad_Usuario] ([curp], [id_especialidad]) VALUES (N'TORC930101MYC', 11)
INSERT [dbo].[Especialidad_Usuario] ([curp], [id_especialidad]) VALUES (N'VAGG890101MYC', 20)
INSERT [dbo].[Especialidad_Usuario] ([curp], [id_especialidad]) VALUES (N'VAME950101MYC', 7)
GO

SET IDENTITY_INSERT [dbo].[Horario] ON 
INSERT [dbo].[Horario] ([id_horario], [horario]) VALUES (1, N'08:00-09:30')
INSERT [dbo].[Horario] ([id_horario], [horario]) VALUES (2, N'09:30-11:00')
INSERT [dbo].[Horario] ([id_horario], [horario]) VALUES (3, N'11:00-12:30')
INSERT [dbo].[Horario] ([id_horario], [horario]) VALUES (4, N'12:30-14:00')
INSERT [dbo].[Horario] ([id_horario], [horario]) VALUES (5, N'14:00-15:30')
INSERT [dbo].[Horario] ([id_horario], [horario]) VALUES (6, N'15:30-17:00')
INSERT [dbo].[Horario] ([id_horario], [horario]) VALUES (7, N'17:00-18:30')
INSERT [dbo].[Horario] ([id_horario], [horario]) VALUES (8, N'18:30-20:00')
INSERT [dbo].[Horario] ([id_horario], [horario]) VALUES (9, N'20:00-21:30')
INSERT [dbo].[Horario] ([id_horario], [horario]) VALUES (10, N'21:30-23:00')
INSERT [dbo].[Horario] ([id_horario], [horario]) VALUES (11, N'23:00-00:30')
INSERT [dbo].[Horario] ([id_horario], [horario]) VALUES (12, N'00:30-02:00')
INSERT [dbo].[Horario] ([id_horario], [horario]) VALUES (13, N'02:00-03:30')
INSERT [dbo].[Horario] ([id_horario], [horario]) VALUES (14, N'03:30-05:00')
INSERT [dbo].[Horario] ([id_horario], [horario]) VALUES (15, N'05:00-06:30')
INSERT [dbo].[Horario] ([id_horario], [horario]) VALUES (16, N'06:30-08:00')
SET IDENTITY_INSERT [dbo].[Horario] OFF
GO

SET IDENTITY_INSERT [dbo].[Medicamento] ON 
INSERT [dbo].[Medicamento] ([id_medicamento], [nombre_medicamento], [descripcion], [existencia], [es_patente], [id_presentacion]) VALUES (1, N'Medicamento A', N'Este medicamento ayuda a aliviar el dolor de cabeza y reducir la fiebre.', 1, 1, 1)
INSERT [dbo].[Medicamento] ([id_medicamento], [nombre_medicamento], [descripcion], [existencia], [es_patente], [id_presentacion]) VALUES (2, N'Medicamento B', N'Este medicamento está indicado para el tratamiento de la tos seca persistente.', 1, 0, 2)
INSERT [dbo].[Medicamento] ([id_medicamento], [nombre_medicamento], [descripcion], [existencia], [es_patente], [id_presentacion]) VALUES (3, N'Medicamento C', N'Este medicamento es eficaz para aliviar el malestar estomacal y reducir la acidez.', 0, 1, 3)
INSERT [dbo].[Medicamento] ([id_medicamento], [nombre_medicamento], [descripcion], [existencia], [es_patente], [id_presentacion]) VALUES (4, N'Medicamento D', N'Este medicamento proporciona alivio rápido y duradero para la congestión nasal.', 1, 0, 1)
INSERT [dbo].[Medicamento] ([id_medicamento], [nombre_medicamento], [descripcion], [existencia], [es_patente], [id_presentacion]) VALUES (5, N'Medicamento E', N'Este medicamento es utilizado para tratar las alergias estacionales y sus síntomas.', 0, 1, 2)
INSERT [dbo].[Medicamento] ([id_medicamento], [nombre_medicamento], [descripcion], [existencia], [es_patente], [id_presentacion]) VALUES (6, N'Medicamento F', N'Este medicamento ayuda a reducir la inflamación y aliviar el dolor en las articulaciones.', 1, 0, 3)
INSERT [dbo].[Medicamento] ([id_medicamento], [nombre_medicamento], [descripcion], [existencia], [es_patente], [id_presentacion]) VALUES (7, N'Medicamento G', N'Este medicamento es un suplemento vitamínico que fortalece el sistema inmunológico.', 0, 1, 1)
INSERT [dbo].[Medicamento] ([id_medicamento], [nombre_medicamento], [descripcion], [existencia], [es_patente], [id_presentacion]) VALUES (8, N'Medicamento H', N'Este medicamento alivia eficazmente el dolor muscular y facilita la recuperación.', 1, 1, 2)
INSERT [dbo].[Medicamento] ([id_medicamento], [nombre_medicamento], [descripcion], [existencia], [es_patente], [id_presentacion]) VALUES (9, N'Medicamento I', N'Este medicamento está indicado para el tratamiento de la hipertensión arterial.', 1, 0, 3)
INSERT [dbo].[Medicamento] ([id_medicamento], [nombre_medicamento], [descripcion], [existencia], [es_patente], [id_presentacion]) VALUES (10, N'Medicamento J', N'Este medicamento ayuda a regular los niveles de colesterol en el organismo.', 0, 1, 1)
INSERT [dbo].[Medicamento] ([id_medicamento], [nombre_medicamento], [descripcion], [existencia], [es_patente], [id_presentacion]) VALUES (11, N'Medicamento K', N'Este medicamento es eficaz para el alivio de la picazón y la irritación en la piel.', 1, 0, 2)
INSERT [dbo].[Medicamento] ([id_medicamento], [nombre_medicamento], [descripcion], [existencia], [es_patente], [id_presentacion]) VALUES (12, N'Medicamento L', N'Este medicamento ayuda a reducir los síntomas del resfriado común y la gripe.', 0, 1, 3)
INSERT [dbo].[Medicamento] ([id_medicamento], [nombre_medicamento], [descripcion], [existencia], [es_patente], [id_presentacion]) VALUES (13, N'Medicamento M', N'Este medicamento alivia el dolor menstrual y reduce la intensidad de los cólicos.', 1, 1, 1)
INSERT [dbo].[Medicamento] ([id_medicamento], [nombre_medicamento], [descripcion], [existencia], [es_patente], [id_presentacion]) VALUES (14, N'Medicamento N', N'Este medicamento es un antihistamínico eficaz para el tratamiento de las alergias.', 1, 0, 2)
INSERT [dbo].[Medicamento] ([id_medicamento], [nombre_medicamento], [descripcion], [existencia], [es_patente], [id_presentacion]) VALUES (15, N'Medicamento O', N'Este medicamento ayuda a regular el tránsito intestinal y aliviar el estreñimiento.', 0, 1, 3)
SET IDENTITY_INSERT [dbo].[Medicamento] OFF
GO

INSERT [dbo].[Medicamento_Receta] ([id_receta], [id_medicamento]) VALUES (1, 1)
INSERT [dbo].[Medicamento_Receta] ([id_receta], [id_medicamento]) VALUES (2, 2)
INSERT [dbo].[Medicamento_Receta] ([id_receta], [id_medicamento]) VALUES (3, 3)
INSERT [dbo].[Medicamento_Receta] ([id_receta], [id_medicamento]) VALUES (4, 4)
INSERT [dbo].[Medicamento_Receta] ([id_receta], [id_medicamento]) VALUES (5, 5)
INSERT [dbo].[Medicamento_Receta] ([id_receta], [id_medicamento]) VALUES (6, 6)
INSERT [dbo].[Medicamento_Receta] ([id_receta], [id_medicamento]) VALUES (7, 7)
INSERT [dbo].[Medicamento_Receta] ([id_receta], [id_medicamento]) VALUES (8, 8)
INSERT [dbo].[Medicamento_Receta] ([id_receta], [id_medicamento]) VALUES (9, 9)
INSERT [dbo].[Medicamento_Receta] ([id_receta], [id_medicamento]) VALUES (10, 10)
INSERT [dbo].[Medicamento_Receta] ([id_receta], [id_medicamento]) VALUES (11, 11)
GO

SET IDENTITY_INSERT [dbo].[Ocupacion] ON 
INSERT [dbo].[Ocupacion] ([id_ocupacion], [ocupacion]) VALUES (1, N'Medico')
INSERT [dbo].[Ocupacion] ([id_ocupacion], [ocupacion]) VALUES (2, N'Abogado')
INSERT [dbo].[Ocupacion] ([id_ocupacion], [ocupacion]) VALUES (3, N'Arquitecto')
INSERT [dbo].[Ocupacion] ([id_ocupacion], [ocupacion]) VALUES (4, N'Ingeniero')
INSERT [dbo].[Ocupacion] ([id_ocupacion], [ocupacion]) VALUES (5, N'Contador')
INSERT [dbo].[Ocupacion] ([id_ocupacion], [ocupacion]) VALUES (6, N'Profesor')
INSERT [dbo].[Ocupacion] ([id_ocupacion], [ocupacion]) VALUES (7, N'Diseñador gráfico')
INSERT [dbo].[Ocupacion] ([id_ocupacion], [ocupacion]) VALUES (8, N'Programador')
INSERT [dbo].[Ocupacion] ([id_ocupacion], [ocupacion]) VALUES (9, N'Gerente')
INSERT [dbo].[Ocupacion] ([id_ocupacion], [ocupacion]) VALUES (10, N'Consultor')
INSERT [dbo].[Ocupacion] ([id_ocupacion], [ocupacion]) VALUES (11, N'Investigador')
INSERT [dbo].[Ocupacion] ([id_ocupacion], [ocupacion]) VALUES (12, N'Administrador')
SET IDENTITY_INSERT [dbo].[Ocupacion] OFF
GO

SET IDENTITY_INSERT [dbo].[Presentacion] ON 
INSERT [dbo].[Presentacion] ([id_presentacion], [presentacion]) VALUES (1, N'solidas')
INSERT [dbo].[Presentacion] ([id_presentacion], [presentacion]) VALUES (2, N'semisolida')
INSERT [dbo].[Presentacion] ([id_presentacion], [presentacion]) VALUES (3, N'liquidas')
SET IDENTITY_INSERT [dbo].[Presentacion] OFF
GO

SET IDENTITY_INSERT [dbo].[Receta] ON 
INSERT [dbo].[Receta] ([id_receta], [descripcion]) VALUES (1, N'Tomar 1 tableta de medicamento A cada 8 horas.')
INSERT [dbo].[Receta] ([id_receta], [descripcion]) VALUES (2, N'Aplicar crema B en la zona afectada dos veces al día.')
INSERT [dbo].[Receta] ([id_receta], [descripcion]) VALUES (3, N'Tomar 2 cucharaditas de jarabe C cada 6 horas.')
INSERT [dbo].[Receta] ([id_receta], [descripcion]) VALUES (4, N'Realizar inhalaciones con medicamento D tres veces al día.')
INSERT [dbo].[Receta] ([id_receta], [descripcion]) VALUES (5, N'Aplicar loción E en el cuero cabelludo una vez al día.')
INSERT [dbo].[Receta] ([id_receta], [descripcion]) VALUES (6, N'Tomar 1 cápsula de medicamento F con el desayuno.')
INSERT [dbo].[Receta] ([id_receta], [descripcion]) VALUES (7, N'Aplicar ungüento G en el área irritada dos veces al día.')
INSERT [dbo].[Receta] ([id_receta], [descripcion]) VALUES (8, N'Tomar 1 tableta de medicamento H antes de dormir.')
INSERT [dbo].[Receta] ([id_receta], [descripcion]) VALUES (9, N'Aplicar gotas de medicamento I en los ojos cada 4 horas.')
INSERT [dbo].[Receta] ([id_receta], [descripcion]) VALUES (10, N'Tomar 1 pastilla de medicamento J después de cada comida.')
INSERT [dbo].[Receta] ([id_receta], [descripcion]) VALUES (11, N'Aplicar parche K en el brazo una vez al día.')
SET IDENTITY_INSERT [dbo].[Receta] OFF
GO

INSERT [dbo].[Receta_Usuario] ([id_receta], [curp]) VALUES (1, N'GOFM850523MDFNNC03')
INSERT [dbo].[Receta_Usuario] ([id_receta], [curp]) VALUES (2, N'HETG910523MDFNNG11')
INSERT [dbo].[Receta_Usuario] ([id_receta], [curp]) VALUES (3, N'HEVL930523MDFNNL06')
INSERT [dbo].[Receta_Usuario] ([id_receta], [curp]) VALUES (4, N'JICR840523MDFNNR10')
INSERT [dbo].[Receta_Usuario] ([id_receta], [curp]) VALUES (5, N'LOGJ900623MDFNNG07')
INSERT [dbo].[Receta_Usuario] ([id_receta], [curp]) VALUES (6, N'MEGS840523MDFNNS10')
INSERT [dbo].[Receta_Usuario] ([id_receta], [curp]) VALUES (7, N'MERJ850523MDFNNJ07')
INSERT [dbo].[Receta_Usuario] ([id_receta], [curp]) VALUES (8, N'MOGA920523MDFNND11')
INSERT [dbo].[Receta_Usuario] ([id_receta], [curp]) VALUES (9, N'OEMA870523MDFNNA03')
INSERT [dbo].[Receta_Usuario] ([id_receta], [curp]) VALUES (10, N'PARC950523MDFNND06')
INSERT [dbo].[Receta_Usuario] ([id_receta], [curp]) VALUES (11, N'RASP870523MDFNNP02')
GO

SET IDENTITY_INSERT [dbo].[Sexo] ON 
INSERT [dbo].[Sexo] ([id_sexo], [sexo]) VALUES (0, N'mujer')
INSERT [dbo].[Sexo] ([id_sexo], [sexo]) VALUES (1, N'hombre')
SET IDENTITY_INSERT [dbo].[Sexo] OFF
GO

SET IDENTITY_INSERT [dbo].[Tipo_servicio] ON 
INSERT [dbo].[Tipo_servicio] ([id_tipo_servicio], [tipo_servicio], [costo]) VALUES (1, N'Consultas médicas', 100)
INSERT [dbo].[Tipo_servicio] ([id_tipo_servicio], [tipo_servicio], [costo]) VALUES (2, N'Cirugía', 5000)
INSERT [dbo].[Tipo_servicio] ([id_tipo_servicio], [tipo_servicio], [costo]) VALUES (3, N'Urgencias', 300)
INSERT [dbo].[Tipo_servicio] ([id_tipo_servicio], [tipo_servicio], [costo]) VALUES (4, N'Cuidados intensivos', 1000)
INSERT [dbo].[Tipo_servicio] ([id_tipo_servicio], [tipo_servicio], [costo]) VALUES (5, N'Maternidad y obstetricia', 2000)
INSERT [dbo].[Tipo_servicio] ([id_tipo_servicio], [tipo_servicio], [costo]) VALUES (6, N'Pediatría', 150)
INSERT [dbo].[Tipo_servicio] ([id_tipo_servicio], [tipo_servicio], [costo]) VALUES (7, N'Medicina interna', 200)
INSERT [dbo].[Tipo_servicio] ([id_tipo_servicio], [tipo_servicio], [costo]) VALUES (8, N'Radiología', 250)
INSERT [dbo].[Tipo_servicio] ([id_tipo_servicio], [tipo_servicio], [costo]) VALUES (9, N'Laboratorio clínico', 80)
INSERT [dbo].[Tipo_servicio] ([id_tipo_servicio], [tipo_servicio], [costo]) VALUES (10, N'Rehabilitación', 150)
INSERT [dbo].[Tipo_servicio] ([id_tipo_servicio], [tipo_servicio], [costo]) VALUES (11, N'Oncología', 500)
INSERT [dbo].[Tipo_servicio] ([id_tipo_servicio], [tipo_servicio], [costo]) VALUES (12, N'Psiquiatría', 300)
INSERT [dbo].[Tipo_servicio] ([id_tipo_servicio], [tipo_servicio], [costo]) VALUES (13, N'Cardiología', 400)
INSERT [dbo].[Tipo_servicio] ([id_tipo_servicio], [tipo_servicio], [costo]) VALUES (14, N'Ginecología', 180)
INSERT [dbo].[Tipo_servicio] ([id_tipo_servicio], [tipo_servicio], [costo]) VALUES (15, N'Neurología', 450)
INSERT [dbo].[Tipo_servicio] ([id_tipo_servicio], [tipo_servicio], [costo]) VALUES (16, N'Oftalmología', 300)
INSERT [dbo].[Tipo_servicio] ([id_tipo_servicio], [tipo_servicio], [costo]) VALUES (17, N'Medicina de emergencia', 400)
SET IDENTITY_INSERT [dbo].[Tipo_servicio] OFF
GO

SET IDENTITY_INSERT [dbo].[Tipo_usuario] ON 
INSERT [dbo].[Tipo_usuario] ([id_tipo_usuario], [tipo_usuario]) VALUES (1, N'paciente')
INSERT [dbo].[Tipo_usuario] ([id_tipo_usuario], [tipo_usuario]) VALUES (2, N'doctor')
INSERT [dbo].[Tipo_usuario] ([id_tipo_usuario], [tipo_usuario]) VALUES (3, N'administrador')
SET IDENTITY_INSERT [dbo].[Tipo_usuario] OFF
GO

INSERT [dbo].[Usuario] ([curp], [correo], [password], [nombre], [ap_paterno], [ap_materno], [celular], [edad], [id_sexo], [id_ocupacion], [id_tipo_usuario]) VALUES (N'CADK890523MDFNNK04', N'queen11@example.com', N'pard11', N'Karla', N'Castro', N'Delgado', N'5558889999', 31, 0, 4, 1)
INSERT [dbo].[Usuario] ([curp], [correo], [password], [nombre], [ap_paterno], [ap_materno], [celular], [edad], [id_sexo], [id_ocupacion], [id_tipo_usuario]) VALUES (N'FESM880101MYC', N'mfs3@hospital.com', N'2456', N'María', N'Fernández', N'Sánchez', N'3456789012', 35, 0, 1, 2)
INSERT [dbo].[Usuario] ([curp], [correo], [password], [nombre], [ap_paterno], [ap_materno], [celular], [edad], [id_sexo], [id_ocupacion], [id_tipo_usuario]) VALUES (N'GOFM850523MDFNNC03', N'cgf@outlook.com', N'paord4', N'Carlos', N'Gómez', N'Fernández', N'5551112222', 35, 1, 3, 1)
INSERT [dbo].[Usuario] ([curp], [correo], [password], [nombre], [ap_paterno], [ap_materno], [celular], [edad], [id_sexo], [id_ocupacion], [id_tipo_usuario]) VALUES (N'GOLA900101MYC', N'abc1@dom.com', N'password1', N'Ana', N'García', N'López', N'1234567890', 30, 0, 1, 2)
INSERT [dbo].[Usuario] ([curp], [correo], [password], [nombre], [ap_paterno], [ap_materno], [celular], [edad], [id_sexo], [id_ocupacion], [id_tipo_usuario]) VALUES (N'GOLM910523MDFNNM12', N'admin1@hospital.com', N'mgl30', N'María', N'González', N'López', N'5551234567', 30, 0, 12, 3)
INSERT [dbo].[Usuario] ([curp], [correo], [password], [nombre], [ap_paterno], [ap_materno], [celular], [edad], [id_sexo], [id_ocupacion], [id_tipo_usuario]) VALUES (N'GUMD900101MYC', N'koala@example.com', N'DM123', N'Diana', N'Guzmán', N'Mendoza', N'1234567890', 30, 0, 1, 2)
INSERT [dbo].[Usuario] ([curp], [correo], [password], [nombre], [ap_paterno], [ap_materno], [celular], [edad], [id_sexo], [id_ocupacion], [id_tipo_usuario]) VALUES (N'HERR910101MYC', N'logic8@logic.com', N'word8', N'Roberto', N'Herrera', N'García', N'8901234567', 29, 1, 1, 2)
INSERT [dbo].[Usuario] ([curp], [correo], [password], [nombre], [ap_paterno], [ap_materno], [celular], [edad], [id_sexo], [id_ocupacion], [id_tipo_usuario]) VALUES (N'HETG910523MDFNNG11', N'pr9@exple.com', N'asf19', N'Gabriela', N'Hernández', N'Torres', N'5556667777', 30, 0, 11, 1)
INSERT [dbo].[Usuario] ([curp], [correo], [password], [nombre], [ap_paterno], [ap_materno], [celular], [edad], [id_sexo], [id_ocupacion], [id_tipo_usuario]) VALUES (N'HEVL930523MDFNNL06', N'laura005@yahoo.com', N'passw', N'Laura', N'Herrera', N'Vargas', N'5552223333', 28, 0, 6, 1)
INSERT [dbo].[Usuario] ([curp], [correo], [password], [nombre], [ap_paterno], [ap_materno], [celular], [edad], [id_sexo], [id_ocupacion], [id_tipo_usuario]) VALUES (N'JICR840523MDFNNR10', N'bedolla8@ipn.com', N'pard8', N'Roberto', N'Jiménez', N'Cruz', N'5555556666', 38, 1, 10, 1)
INSERT [dbo].[Usuario] ([curp], [correo], [password], [nombre], [ap_paterno], [ap_materno], [celular], [edad], [id_sexo], [id_ocupacion], [id_tipo_usuario]) VALUES (N'LOGJ900623MDFNNG07', N'jlg2@xample.com', N'pepeo', N'Juan', N'López', N'García', N'5559876543', 30, 1, 7, 1)
INSERT [dbo].[Usuario] ([curp], [correo], [password], [nombre], [ap_paterno], [ap_materno], [celular], [edad], [id_sexo], [id_ocupacion], [id_tipo_usuario]) VALUES (N'LORS940101MYC', N'p1020@example.com', N'1010100', N'Ricardo', N'López', N'Sánchez', N'0123456789', 26, 1, 1, 2)
INSERT [dbo].[Usuario] ([curp], [correo], [password], [nombre], [ap_paterno], [ap_materno], [celular], [edad], [id_sexo], [id_ocupacion], [id_tipo_usuario]) VALUES (N'MARJ860523MDFNNR12', N'admin2@hospital.com', N'jmr35', N'Juan', N'Martínez', N'Rodríguez', N'5559876543', 35, 1, 12, 3)
INSERT [dbo].[Usuario] ([curp], [correo], [password], [nombre], [ap_paterno], [ap_materno], [celular], [edad], [id_sexo], [id_ocupacion], [id_tipo_usuario]) VALUES (N'MASA860101MYC', N'persona9@emdn.com', N'word9', N'Alejandra', N'Morales', N'Salazar', N'9012345678', 33, 0, 1, 2)
INSERT [dbo].[Usuario] ([curp], [correo], [password], [nombre], [ap_paterno], [ap_materno], [celular], [edad], [id_sexo], [id_ocupacion], [id_tipo_usuario]) VALUES (N'MEGL890101MYC', N'lmg@dominio.com', N'alfa27', N'Laura', N'Méndez', N'García', N'5678901234', 32, 0, 1, 2)
INSERT [dbo].[Usuario] ([curp], [correo], [password], [nombre], [ap_paterno], [ap_materno], [celular], [edad], [id_sexo], [id_ocupacion], [id_tipo_usuario]) VALUES (N'MEGS840523MDFNNS10', N'p8@example.com', N'312rd18', N'Sergio', N'Mendoza', N'Guzmán', N'5555556666', 37, 1, 10, 1)
INSERT [dbo].[Usuario] ([curp], [correo], [password], [nombre], [ap_paterno], [ap_materno], [celular], [edad], [id_sexo], [id_ocupacion], [id_tipo_usuario]) VALUES (N'MERJ850523MDFNNJ07', N'bob12@ple.com', N'passrd12', N'Jorge', N'Méndez', N'Robles', N'5559990000', 36, 1, 7, 1)
INSERT [dbo].[Usuario] ([curp], [correo], [password], [nombre], [ap_paterno], [ap_materno], [celular], [edad], [id_sexo], [id_ocupacion], [id_tipo_usuario]) VALUES (N'MOGA920523MDFNND11', N'amg9@example.com', N'pas', N'Andrea', N'Morales', N'González', N'5556667777', 29, 0, 11, 1)
INSERT [dbo].[Usuario] ([curp], [correo], [password], [nombre], [ap_paterno], [ap_materno], [celular], [edad], [id_sexo], [id_ocupacion], [id_tipo_usuario]) VALUES (N'NARP870101MYC', N'correo7@example.com', N'pass7', N'Patricia', N'Navarro', N'Ríos', N'7890123456', 31, 0, 1, 2)
INSERT [dbo].[Usuario] ([curp], [correo], [password], [nombre], [ap_paterno], [ap_materno], [celular], [edad], [id_sexo], [id_ocupacion], [id_tipo_usuario]) VALUES (N'OEMA870523MDFNNA03', N'per14@exmple.com', N'pdsafd14', N'Alejandro', N'Ortega', N'Méndez', N'5551112222', 34, 1, 3, 1)
INSERT [dbo].[Usuario] ([curp], [correo], [password], [nombre], [ap_paterno], [ap_materno], [celular], [edad], [id_sexo], [id_ocupacion], [id_tipo_usuario]) VALUES (N'ORMJ960101MYC', N'a6@example.com', N'pass6', N'Javier', N'Ortega', N'Morales', N'6789012345', 27, 1, 1, 2)
INSERT [dbo].[Usuario] ([curp], [correo], [password], [nombre], [ap_paterno], [ap_materno], [celular], [edad], [id_sexo], [id_ocupacion], [id_tipo_usuario]) VALUES (N'PARC950523MDFNND06', N'perna15@exmple.com', N'pasard15', N'Diana', N'Paredes', N'Ruiz', N'5552223333', 26, 0, 6, 1)
INSERT [dbo].[Usuario] ([curp], [correo], [password], [nombre], [ap_paterno], [ap_materno], [celular], [edad], [id_sexo], [id_ocupacion], [id_tipo_usuario]) VALUES (N'PEVA950523MDFNNA12', N'admin5@hospital.com', N'apv25', N'Ana', N'Pérez', N'Vargas', N'5552223333', 25, 0, 12, 3)
INSERT [dbo].[Usuario] ([curp], [correo], [password], [nombre], [ap_paterno], [ap_materno], [celular], [edad], [id_sexo], [id_ocupacion], [id_tipo_usuario]) VALUES (N'PIGG880101MYC', N'ptr@example.com', N'password13', N'Gabriela', N'Pineda', N'Guzmán', N'3456789012', 35, 0, 1, 2)
INSERT [dbo].[Usuario] ([curp], [correo], [password], [nombre], [ap_paterno], [ap_materno], [celular], [edad], [id_sexo], [id_ocupacion], [id_tipo_usuario]) VALUES (N'RASP870523MDFNNP02', N'daft0@example.com', N'rd10', N'Pedro', N'Ramos', N'Soto', N'5557778888', 33, 1, 2, 1)
INSERT [dbo].[Usuario] ([curp], [correo], [password], [nombre], [ap_paterno], [ap_materno], [celular], [edad], [id_sexo], [id_ocupacion], [id_tipo_usuario]) VALUES (N'REMA890523MDFNNR02', N'pera20@exaple.com', N'phgfnd20', N'Alejandro', N'Reyes', N'Mendoza', N'5557778888', 32, 1, 2, 1)
INSERT [dbo].[Usuario] ([curp], [correo], [password], [nombre], [ap_paterno], [ap_materno], [celular], [edad], [id_sexo], [id_ocupacion], [id_tipo_usuario]) VALUES (N'RENP910523MDFNNP09', N'paolaNava7@ipn.com', N'ssword7', N'Paola', N'Reyes', N'Nava', N'5554445555', 32, 0, 9, 1)
INSERT [dbo].[Usuario] ([curp], [correo], [password], [nombre], [ap_paterno], [ap_materno], [celular], [edad], [id_sexo], [id_ocupacion], [id_tipo_usuario]) VALUES (N'RICG940523MDFNNG05', N'pep@am.com', N'passwd13', N'Gabriela', N'Ríos', N'Castro', N'5550001111', 27, 0, 5, 1)
INSERT [dbo].[Usuario] ([curp], [correo], [password], [nombre], [ap_paterno], [ap_materno], [celular], [edad], [id_sexo], [id_ocupacion], [id_tipo_usuario]) VALUES (N'RIPJ930101MYC', N'citatir@example.com', N'contrasena14', N'Luis', N'Ríos', N'Paredes', N'4567890123', 28, 1, 1, 2)
INSERT [dbo].[Usuario] ([curp], [correo], [password], [nombre], [ap_paterno], [ap_materno], [celular], [edad], [id_sexo], [id_ocupacion], [id_tipo_usuario]) VALUES (N'ROLJ950101MYC', N'm123@example.com', N'm123', N'Juan', N'Rodríguez', N'López', N'2345678901', 25, 1, 1, 2)
INSERT [dbo].[Usuario] ([curp], [correo], [password], [nombre], [ap_paterno], [ap_materno], [celular], [edad], [id_sexo], [id_ocupacion], [id_tipo_usuario]) VALUES (N'ROSA820523MDFNNS09', N'pena17@exple.com', N'fasfa7', N'Sandra', N'Rojas', N'Sánchez', N'5554445555', 39, 0, 9, 1)
INSERT [dbo].[Usuario] ([curp], [correo], [password], [nombre], [ap_paterno], [ap_materno], [celular], [edad], [id_sexo], [id_ocupacion], [id_tipo_usuario]) VALUES (N'ROSA950523MDFNNA04', N'logical1@example.com', N'pa1456', N'Ana', N'Rodríguez', N'Sánchez', N'5551234567', 25, 0, 4, 1)
INSERT [dbo].[Usuario] ([curp], [correo], [password], [nombre], [ap_paterno], [ap_materno], [celular], [edad], [id_sexo], [id_ocupacion], [id_tipo_usuario]) VALUES (N'ROSC900523MDFNNS12', N'admin4@hospital.com', N'crs33', N'Carlos', N'Rodríguez', N'Sánchez', N'5551112222', 33, 1, 12, 3)
INSERT [dbo].[Usuario] ([curp], [correo], [password], [nombre], [ap_paterno], [ap_materno], [celular], [edad], [id_sexo], [id_ocupacion], [id_tipo_usuario]) VALUES (N'SIMM760523MDFNNM08', N'pepe6@exa.com', N'pasord6', N'Miguel', N'Silva', N'Mendoza', N'5553334444', 45, 1, 8, 1)
INSERT [dbo].[Usuario] ([curp], [correo], [password], [nombre], [ap_paterno], [ap_materno], [celular], [edad], [id_sexo], [id_ocupacion], [id_tipo_usuario]) VALUES (N'TOGL930523MDFNNG12', N'admin3@hospital.com', N'ltg28', N'Laura', N'Torres', N'Gómez', N'5555555555', 28, 0, 12, 3)
INSERT [dbo].[Usuario] ([curp], [correo], [password], [nombre], [ap_paterno], [ap_materno], [celular], [edad], [id_sexo], [id_ocupacion], [id_tipo_usuario]) VALUES (N'TOMR800523MDFNNT05', N'maria@gmail.com', N'pword3', N'María', N'Torres', N'Ramírez', N'5555555555', 40, 0, 5, 1)
INSERT [dbo].[Usuario] ([curp], [correo], [password], [nombre], [ap_paterno], [ap_materno], [celular], [edad], [id_sexo], [id_ocupacion], [id_tipo_usuario]) VALUES (N'TORC930101MYC', N'ctr@yahoo.com', N'1984', N'Carlos', N'Torres', N'Ramírez', N'4567890123', 28, 1, 1, 2)
INSERT [dbo].[Usuario] ([curp], [correo], [password], [nombre], [ap_paterno], [ap_materno], [celular], [edad], [id_sexo], [id_ocupacion], [id_tipo_usuario]) VALUES (N'VAGG890101MYC', N'persona15@example.com', N'password15', N'Gabriela', N'Vargas', N'Guzmán', N'5678901234', 32, 0, 1, 2)
INSERT [dbo].[Usuario] ([curp], [correo], [password], [nombre], [ap_paterno], [ap_materno], [celular], [edad], [id_sexo], [id_ocupacion], [id_tipo_usuario]) VALUES (N'VAME950101MYC', N'DoctorEduardo@hospital.com', N'EDP', N'Eduardo', N'Vargas', N'Mendoza', N'2345678901', 25, 1, 1, 2)
INSERT [dbo].[Usuario] ([curp], [correo], [password], [nombre], [ap_paterno], [ap_materno], [celular], [edad], [id_sexo], [id_ocupacion], [id_tipo_usuario]) VALUES (N'VEMR780523MDFNNR08', N'pea16@exaple.com', N'1412fs', N'Ricardo', N'Vega', N'Mendoza', N'5553334444', 43, 1, 8, 1)
GO

ALTER TABLE [dbo].[Cita]  WITH CHECK ADD  CONSTRAINT [cita_consultorio] FOREIGN KEY([id_consultorio])
REFERENCES [dbo].[Consultorio] ([id_consultorio])
GO
ALTER TABLE [dbo].[Cita] CHECK CONSTRAINT [cita_consultorio]
GO

ALTER TABLE [dbo].[Cita]  WITH CHECK ADD  CONSTRAINT [tipo_servicio_cita] FOREIGN KEY([id_tipo_servicio])
REFERENCES [dbo].[Tipo_servicio] ([id_tipo_servicio])
GO
ALTER TABLE [dbo].[Cita] CHECK CONSTRAINT [tipo_servicio_cita]
GO

ALTER TABLE [dbo].[Cita_Usuario]  WITH CHECK ADD  CONSTRAINT [curp_cita] FOREIGN KEY([curp])
REFERENCES [dbo].[Usuario] ([curp])
GO
ALTER TABLE [dbo].[Cita_Usuario] CHECK CONSTRAINT [curp_cita]
GO

ALTER TABLE [dbo].[Cita_Usuario]  WITH CHECK ADD  CONSTRAINT [id_cita_usuario] FOREIGN KEY([id_cita])
REFERENCES [dbo].[Cita] ([id_cita])
GO
ALTER TABLE [dbo].[Cita_Usuario] CHECK CONSTRAINT [id_cita_usuario]
GO

ALTER TABLE [dbo].[Consultorio]  WITH CHECK ADD  CONSTRAINT [curp_consultorio] FOREIGN KEY([curp_doctor])
REFERENCES [dbo].[Usuario] ([curp])
GO
ALTER TABLE [dbo].[Consultorio] CHECK CONSTRAINT [curp_consultorio]
GO

ALTER TABLE [dbo].[Consultorio]  WITH CHECK ADD  CONSTRAINT [horario_consultorio] FOREIGN KEY([id_horario])
REFERENCES [dbo].[Horario] ([id_horario])
GO
ALTER TABLE [dbo].[Consultorio] CHECK CONSTRAINT [horario_consultorio]
GO

ALTER TABLE [dbo].[Especialidad_Usuario]  WITH CHECK ADD  CONSTRAINT [curp] FOREIGN KEY([curp])
REFERENCES [dbo].[Usuario] ([curp])
GO
ALTER TABLE [dbo].[Especialidad_Usuario] CHECK CONSTRAINT [curp]
GO

ALTER TABLE [dbo].[Especialidad_Usuario]  WITH CHECK ADD  CONSTRAINT [id_especialidad] FOREIGN KEY([id_especialidad])
REFERENCES [dbo].[Especialidad] ([id_especialidad])
GO
ALTER TABLE [dbo].[Especialidad_Usuario] CHECK CONSTRAINT [id_especialidad]
GO

ALTER TABLE [dbo].[Medicamento]  WITH CHECK ADD  CONSTRAINT [id_presentacion] FOREIGN KEY([id_presentacion])
REFERENCES [dbo].[Presentacion] ([id_presentacion])
GO
ALTER TABLE [dbo].[Medicamento] CHECK CONSTRAINT [id_presentacion]
GO

ALTER TABLE [dbo].[Medicamento_Receta]  WITH CHECK ADD  CONSTRAINT [id_medicamento] FOREIGN KEY([id_medicamento])
REFERENCES [dbo].[Medicamento] ([id_medicamento])
GO
ALTER TABLE [dbo].[Medicamento_Receta] CHECK CONSTRAINT [id_medicamento]
GO

ALTER TABLE [dbo].[Medicamento_Receta]  WITH CHECK ADD  CONSTRAINT [id_receta] FOREIGN KEY([id_receta])
REFERENCES [dbo].[Receta] ([id_receta])
GO
ALTER TABLE [dbo].[Medicamento_Receta] CHECK CONSTRAINT [id_receta]
GO

ALTER TABLE [dbo].[Receta_Usuario]  WITH CHECK ADD  CONSTRAINT [curp_receta] FOREIGN KEY([curp])
REFERENCES [dbo].[Usuario] ([curp])
GO
ALTER TABLE [dbo].[Receta_Usuario] CHECK CONSTRAINT [curp_receta]
GO

ALTER TABLE [dbo].[Receta_Usuario]  WITH CHECK ADD  CONSTRAINT [id_receta_usuario] FOREIGN KEY([id_receta])
REFERENCES [dbo].[Receta] ([id_receta])
GO
ALTER TABLE [dbo].[Receta_Usuario] CHECK CONSTRAINT [id_receta_usuario]
GO

ALTER TABLE [dbo].[Usuario]  WITH CHECK ADD  CONSTRAINT [id_ocupacion] FOREIGN KEY([id_ocupacion])
REFERENCES [dbo].[Ocupacion] ([id_ocupacion])
GO
ALTER TABLE [dbo].[Usuario] CHECK CONSTRAINT [id_ocupacion]
GO

ALTER TABLE [dbo].[Usuario]  WITH CHECK ADD  CONSTRAINT [id_sexo] FOREIGN KEY([id_sexo])
REFERENCES [dbo].[Sexo] ([id_sexo])
GO
ALTER TABLE [dbo].[Usuario] CHECK CONSTRAINT [id_sexo]
GO

ALTER TABLE [dbo].[Usuario]  WITH CHECK ADD  CONSTRAINT [id_tipo_usuario] FOREIGN KEY([id_tipo_usuario])
REFERENCES [dbo].[Tipo_usuario] ([id_tipo_usuario])
GO
ALTER TABLE [dbo].[Usuario] CHECK CONSTRAINT [id_tipo_usuario]
GO

ALTER TABLE Usuario
ALTER COLUMN correo VARCHAR(40);

GO

ALTER TABLE Usuario
ALTER COLUMN password VARCHAR(15);

GO

ALTER TABLE Medicamento ALTER COLUMN existencia INT;

GO

CREATE FUNCTION ObtenerMedicamentosRecetados
(
    @curp VARCHAR(18) = NULL,
    @nombre VARCHAR(20) = NULL,
    @ap_paterno VARCHAR(20) = NULL,
    @ap_materno VARCHAR(20) = NULL
)
RETURNS TABLE
AS
RETURN
(
    SELECT M.nombre_medicamento, M.descripcion
    FROM Usuario U
    INNER JOIN Receta_Usuario RU ON U.curp = RU.curp
    INNER JOIN Receta R ON RU.id_receta = R.id_receta
    INNER JOIN Medicamento_Receta MR ON R.id_receta = MR.id_receta
    INNER JOIN Medicamento M ON MR.id_medicamento = M.id_medicamento
    WHERE U.curp = @curp OR (U.nombre = @nombre AND U.ap_paterno = @ap_paterno AND U.ap_materno = @ap_materno)
);

GO

CREATE FUNCTION ObtenerCitas (@curpDoctor VARCHAR(18), @fecha DATE)
RETURNS @tbCitas TABLE(
	doctor VARCHAR(150),
	fecha DATE,
	consultorio INT,
	servicio VARCHAR(40),
	costo MONEY
)
AS
BEGIN
	--Falta de curp y fecha
	IF @curpDoctor IS NULL AND @fecha IS NULL
		BEGIN
		INSERT INTO @tbCitas
			SELECT	CONCAT(U.nombre, ' ', U.ap_paterno, ' ', U.ap_materno),
					C.fecha,
					C.id_consultorio,
					TS.tipo_servicio,
					TS.costo
			FROM Usuario AS U
			INNER JOIN Cita_Usuario AS CU
			ON U.curp = CU.curp
			INNER JOIN Cita AS C
			ON CU.id_cita = C.id_cita
			INNER JOIN Tipo_servicio AS TS
			ON C.id_tipo_servicio = TS.id_tipo_servicio
			WHERE C.fecha >= GETDATE()
		END
	ELSE
		--Falta de curp
		IF @curpDoctor IS NULL
			BEGIN
			INSERT INTO @tbCitas
				SELECT	CONCAT(U.nombre, ' ', U.ap_paterno, ' ', U.ap_materno),
						C.fecha,
						C.id_consultorio,
						TS.tipo_servicio,
						TS.costo
				FROM Usuario AS U
				INNER JOIN Cita_Usuario AS CU
				ON U.curp = CU.curp
				INNER JOIN Cita AS C
				ON CU.id_cita = C.id_cita
				INNER JOIN Tipo_servicio AS TS
				ON C.id_tipo_servicio = TS.id_tipo_servicio
				WHERE C.fecha = @fecha
			END
		ELSE
			--Falta de fecha
			IF @fecha IS NULL
				BEGIN
				INSERT INTO @tbCitas
					SELECT	CONCAT(U.nombre, ' ', U.ap_paterno, ' ', U.ap_materno),
							C.fecha,
							C.id_consultorio,
							TS.tipo_servicio,
							TS.costo
					FROM Usuario AS U
					INNER JOIN Cita_Usuario AS CU
					ON U.curp = CU.curp
					INNER JOIN Cita AS C
					ON CU.id_cita = C.id_cita
					INNER JOIN Tipo_servicio AS TS
					ON C.id_tipo_servicio = TS.id_tipo_servicio
					WHERE U.curp = @curpDoctor
					AND C.fecha >= GETDATE()
				END
	ELSE
		--Se brinda el curp y fecha
		BEGIN
		INSERT INTO @tbCitas
			SELECT	CONCAT(U.nombre, ' ', U.ap_paterno, ' ', U.ap_materno),
					C.fecha,
					C.id_consultorio,
					TS.tipo_servicio,
					TS.costo
			FROM Usuario AS U
			INNER JOIN Cita_Usuario AS CU
			ON U.curp = CU.curp
			INNER JOIN Cita AS C
			ON CU.id_cita = C.id_cita
			INNER JOIN Tipo_servicio AS TS
			ON C.id_tipo_servicio = TS.id_tipo_servicio
			WHERE U.curp = @curpDoctor
			AND C.fecha = @fecha
		END
	RETURN
END
GO

--STORED PROCEDURE PARA VALIDAR LA INSERCI�N DE UN USUARIO

CREATE PROCEDURE insertar_usuario
	@curp VARCHAR(18),
	@correo VARCHAR(40),
	@password VARCHAR(15),
	@nombre VARCHAR(20),
	@ap_paterno VARCHAR(20),
	@ap_materno VARCHAR(20),
	@celular VARCHAR(10),
	@edad INT,
	@id_sexo INT,
	@id_ocupacion INT,
	@id_tipo_usuario INT,
	@id_especialidad INT
AS
	IF @curp IS NULL OR @correo IS NULL OR @password IS NULL OR @nombre IS NULL OR @ap_paterno IS NULL OR @ap_materno IS NULL OR @celular IS NULL OR @edad IS NULL OR @id_sexo IS NULL OR @id_ocupacion IS NULL OR  @id_tipo_usuario IS NULL
	BEGIN
		PRINT 'Hay datos nulos'
	END
	ELSE
	BEGIN
		IF @curp='' OR @correo='' OR @password='' OR @nombre='' OR @ap_paterno='' OR @ap_materno='' OR @celular=''
		BEGIN
			PRINT 'Hay campos vac�os'
		END
		ELSE
		BEGIN
			IF DATALENGTH(@curp) != 18
			BEGIN
				PRINT 'Curp inv�lida, debe ser de 18 caracteres'
			END
			ELSE
			BEGIN
				IF @id_sexo > 2 OR @id_sexo < 1
				BEGIN
					PRINT 'Sexo no v�lido'
				END
				ELSE
				BEGIN
					IF @id_ocupacion > 12 OR @id_ocupacion < 1
					BEGIN
						PRINT 'Ocupaci�n no v�lida'
					END
					ELSE
					BEGIN
						IF @edad < 0 OR @edad > 122
						BEGIN
							PRINT 'Edad inv�lida'
						END
						ELSE
						BEGIN
							IF (@id_tipo_usuario = 2 AND @id_ocupacion != 1) OR (@id_tipo_usuario = 3 AND @id_ocupacion != 12)
							BEGIN
								PRINT 'La ocupaci�n no coincide con el tipo de usuario'
							END
							ELSE
							BEGIN
								IF @id_tipo_usuario = 2 AND (@id_especialidad < 1 OR @id_especialidad > 20)
								BEGIN
									PRINT 'Especialidad inv�lida'
								END
								ELSE
								BEGIN
									IF DATALENGTH(@celular) != 10
									BEGIN
										PRINT 'Celular no es de 10 d�gitos'
									END
									ELSE
									BEGIN
										PRINT 'Datos v�lidos'
									END
								END
							END
						END
					END
				END
			END
		END	
	END

GO
-- STORED PROCEDURE PARA ACTUALIZAR EXISTENCIAS DE UN MEDICAMENTO

CREATE PROCEDURE actualizar_medicamento
	@nombre_medicamento VARCHAR(15),
	@cantidad INT,
	@operacion INT
AS
	DECLARE @cantidad_final INT

	IF @nombre_medicamento IS NULL OR @cantidad IS NULL OR @operacion IS NULL
	BEGIN
		PRINT 'No puede haber datos nulos'
	END
	ELSE
	BEGIN
		IF @nombre_medicamento = ''
		BEGIN
			PRINT 'El nombre no puede ser vac�o'
		END
		ELSE
		BEGIN
			IF EXISTS(SELECT * FROM Medicamento WHERE nombre_medicamento = @nombre_medicamento)
			BEGIN
				IF @operacion = 1
				BEGIN
					SET @cantidad_final = (SELECT existencia FROM Medicamento WHERE nombre_medicamento = @nombre_medicamento) + @cantidad
					UPDATE Medicamento SET existencia = @cantidad_final WHERE nombre_medicamento = @nombre_medicamento;
				END
				ELSE
				BEGIN
					IF @operacion = 2
					BEGIN
						SET @cantidad_final = (SELECT existencia FROM Medicamento WHERE nombre_medicamento = @nombre_medicamento) - @cantidad
						IF @cantidad_final < 0
						BEGIN
							PRINT 'No puedes restar m�s de lo que hay'
						END
						ELSE
						BEGIN
							UPDATE Medicamento SET existencia = @cantidad_final WHERE nombre_medicamento = @nombre_medicamento;
						END
					END
					ELSE
					BEGIN
						UPDATE Medicamento SET existencia = 0 WHERE nombre_medicamento = @nombre_medicamento;
					END
				END
			END
			ELSE
			BEGIN
				PRINT 'El medicamento no existe'
			END
		END
	END

GO


CREATE TRIGGER ValidarTipoMedicamentoTrigger
ON Medicamento
INSTEAD OF INSERT
AS
BEGIN
    -- Verificar longitud del nombre del medicamento
    IF EXISTS (SELECT 1 FROM inserted WHERE LEN(nombre_medicamento) < 2 OR LEN(nombre_medicamento) > 15)
    BEGIN
        RAISERROR('El nombre del medicamento debe tener entre 2 y 15 caracteres', 16, 1);
        ROLLBACK;
        RETURN;
    END

    -- Verificar duplicados del nombre del medicamento
    IF EXISTS (SELECT 1 FROM Medicamento AS M INNER JOIN inserted AS I ON M.nombre_medicamento = I.nombre_medicamento)
    BEGIN
        RAISERROR('El nombre del medicamento ya existe', 16, 1);
        ROLLBACK;
        RETURN;
    END

    -- Verificar la existencia mayor a 0
    IF EXISTS (SELECT 1 FROM inserted WHERE existencia <= 0)
    BEGIN
        RAISERROR('La existencia del medicamento debe ser mayor a 0', 16, 1);
        ROLLBACK;
        RETURN;
    END

    -- Insertar los registros v�lidos en la tabla Medicamento
    INSERT INTO Medicamento (nombre_medicamento, descripcion, existencia, es_patente, id_presentacion)
    SELECT nombre_medicamento, descripcion, existencia, es_patente, id_presentacion
    FROM inserted;
END;
 GO

CREATE TRIGGER ValidarTipoServicioUpdate
ON Tipo_servicio
INSTEAD OF INSERT
AS
BEGIN
    -- Verificar longitud del tipo de servicio
    IF EXISTS (SELECT 1 FROM inserted WHERE LEN(tipo_servicio) < 1 OR LEN(tipo_servicio) > 40)
    BEGIN
        RAISERROR('El tipo de servicio debe tener entre 1 y 40 caracteres', 16, 1);
        ROLLBACK;
        RETURN;
    END

    -- Verificar duplicados del tipo de servicio
    IF EXISTS (SELECT 1 FROM Tipo_servicio AS TS INNER JOIN inserted AS I ON TS.tipo_servicio = I.tipo_servicio)
    BEGIN
        RAISERROR('El tipo de servicio ya existe', 16, 1);
        ROLLBACK;
        RETURN;
    END

    -- Verificar costo mayor a 0
    IF EXISTS (SELECT 1 FROM inserted WHERE costo <= 0)
    BEGIN
        RAISERROR('El costo debe ser mayor a 0', 16, 1);
        ROLLBACK;
        RETURN;
    END

    -- Insertar los registros v�lidos en la tabla Tipo_servicio
    INSERT INTO Tipo_servicio (tipo_servicio, costo)
    SELECT tipo_servicio, costo
    FROM inserted;
END;

GO

CREATE TRIGGER ValidarUsuarioTrigger
ON Usuario
AFTER UPDATE
AS
BEGIN
    -- Verificar actualizaci�n del correo
    IF UPDATE(correo)
    BEGIN
        IF (SELECT COUNT(*) FROM inserted WHERE correo NOT LIKE '%@%.%') > 0
        BEGIN
            RAISERROR('El correo debe cumplir con el formato nombre@dominio.com', 16, 1);
            ROLLBACK;
        END
    END

    -- Verificar actualizaci�n del password
    IF UPDATE(password)
    BEGIN
        IF (SELECT COUNT(*) FROM inserted WHERE LEN(password) < 8 OR LEN(password) > 15) > 0
        BEGIN
            RAISERROR('El password debe tener entre 8 y 15 caracteres', 16, 1);
            ROLLBACK;
        END
    END

    -- Verificar actualizaci�n del nombre
    IF UPDATE(nombre)
    BEGIN
        IF (SELECT COUNT(*) FROM inserted WHERE nombre = '' OR LEN(nombre) > 20) > 0
        BEGIN
            RAISERROR('El nombre no puede ser cadena vac�a ni tener m�s de 20 caracteres', 16, 1);
            ROLLBACK;
        END
    END

    -- Verificar actualizaci�n del ap_paterno
    IF UPDATE(ap_paterno)
    BEGIN
        IF (SELECT COUNT(*) FROM inserted WHERE ap_paterno = '' OR LEN(ap_paterno) > 20) > 0
        BEGIN
            RAISERROR('El apellido paterno no puede ser cadena vac�a ni tener m�s de 20 caracteres', 16, 1);
            ROLLBACK;
        END
    END

    -- Verificar actualizaci�n del ap_materno
    IF UPDATE(ap_materno)
    BEGIN
        IF (SELECT COUNT(*) FROM inserted WHERE ap_materno = '' OR LEN(ap_materno) > 20) > 0
        BEGIN
            RAISERROR('El apellido materno no puede ser cadena vac�a ni tener m�s de 20 caracteres', 16, 1);
            ROLLBACK;
        END
    END

    -- Verificar actualizaci�n del celular
    IF UPDATE(celular)
    BEGIN
        IF (SELECT COUNT(*) FROM inserted WHERE LEN(celular) < 8 OR LEN(celular) > 10) > 0
        BEGIN
            RAISERROR('El celular debe tener entre 8 y 10 caracteres', 16, 1);
            ROLLBACK;
        END
    END

    -- Verificar actualizaci�n de la edad
    IF UPDATE(edad)
    BEGIN
        IF (SELECT COUNT(*) FROM inserted WHERE edad < 0) > 0
        BEGIN
            RAISERROR('La edad no puede ser menor a 0', 16, 1);
            ROLLBACK;
        END
    END
END;

GO