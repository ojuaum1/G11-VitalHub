USE [master]
GO
/****** Object:  Database [VitalHub_G11]    Script Date: 10/04/2024 08:21:00 ******/
CREATE DATABASE [VitalHub_G11]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'VitalHub_G11', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\VitalHub_G11.mdf' , SIZE = 73728KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'VitalHub_G11_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\VitalHub_G11_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [VitalHub_G11] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [VitalHub_G11].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [VitalHub_G11] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [VitalHub_G11] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [VitalHub_G11] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [VitalHub_G11] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [VitalHub_G11] SET ARITHABORT OFF 
GO
ALTER DATABASE [VitalHub_G11] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [VitalHub_G11] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [VitalHub_G11] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [VitalHub_G11] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [VitalHub_G11] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [VitalHub_G11] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [VitalHub_G11] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [VitalHub_G11] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [VitalHub_G11] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [VitalHub_G11] SET  ENABLE_BROKER 
GO
ALTER DATABASE [VitalHub_G11] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [VitalHub_G11] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [VitalHub_G11] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [VitalHub_G11] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [VitalHub_G11] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [VitalHub_G11] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [VitalHub_G11] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [VitalHub_G11] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [VitalHub_G11] SET  MULTI_USER 
GO
ALTER DATABASE [VitalHub_G11] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [VitalHub_G11] SET DB_CHAINING OFF 
GO
ALTER DATABASE [VitalHub_G11] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [VitalHub_G11] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [VitalHub_G11] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [VitalHub_G11] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [VitalHub_G11] SET QUERY_STORE = ON
GO
ALTER DATABASE [VitalHub_G11] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [VitalHub_G11]
GO
/****** Object:  Table [dbo].[Clinicas]    Script Date: 10/04/2024 08:21:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Clinicas](
	[ID] [uniqueidentifier] NOT NULL,
	[NomeFantasia] [varchar](150) NULL,
	[CNPJ] [varchar](30) NULL,
	[RazaoSocial] [varchar](150) NULL,
	[Email] [varchar](225) NULL,
	[EnderecoID] [uniqueidentifier] NULL,
 CONSTRAINT [PK_Clinicas] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Clinicas$]    Script Date: 10/04/2024 08:21:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Clinicas$](
	[ID] [nvarchar](255) NULL,
	[NomeFantasia] [nvarchar](255) NULL,
	[CNPJ] [nvarchar](255) NULL,
	[RazaoSocial] [nvarchar](255) NULL,
	[Email] [nvarchar](255) NULL,
	[EnderecoID] [nvarchar](255) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Consultas]    Script Date: 10/04/2024 08:21:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Consultas](
	[ID] [uniqueidentifier] NOT NULL,
	[SituacaoID] [uniqueidentifier] NULL,
	[PacienteID] [uniqueidentifier] NULL,
	[MedicoClinicaID] [uniqueidentifier] NULL,
	[ReceitaID] [uniqueidentifier] NULL,
	[PrioridadeID] [uniqueidentifier] NULL,
	[DataConsulta] [datetime] NULL,
	[Descricao] [text] NULL,
	[Diagnostico] [text] NULL,
 CONSTRAINT [PK_Consultas] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Consultas$]    Script Date: 10/04/2024 08:21:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Consultas$](
	[ID] [nvarchar](255) NULL,
	[SituacaoID] [nvarchar](255) NULL,
	[PacienteID] [nvarchar](255) NULL,
	[MedicoClinicaID] [nvarchar](255) NULL,
	[ReceitaID] [nvarchar](255) NULL,
	[PrioridadeID] [nvarchar](255) NULL,
	[DataConsulta] [datetime] NULL,
	[Descricao] [nvarchar](255) NULL,
	[Diagnostico] [nvarchar](255) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Enderecos]    Script Date: 10/04/2024 08:21:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Enderecos](
	[ID] [uniqueidentifier] NOT NULL,
	[CEP] [varchar](50) NULL,
	[Logradouro] [varchar](50) NULL,
	[Numero] [int] NULL,
	[Longitude] [decimal](9, 6) NULL,
	[Latitude] [decimal](8, 6) NULL,
	[Cidade] [varchar](50) NULL,
 CONSTRAINT [PK_Enderecos] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Especialidades]    Script Date: 10/04/2024 08:21:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Especialidades](
	[ID] [uniqueidentifier] NOT NULL,
	[Especialidade] [varchar](100) NULL,
 CONSTRAINT [PK_Especialidades] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Exames]    Script Date: 10/04/2024 08:21:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Exames](
	[ID] [uniqueidentifier] NOT NULL,
	[Descricao] [text] NULL,
	[ConsultaID] [uniqueidentifier] NULL,
 CONSTRAINT [PK_Exames] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Medicos]    Script Date: 10/04/2024 08:21:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Medicos](
	[ID] [uniqueidentifier] NOT NULL,
	[EspecialidadeID] [uniqueidentifier] NULL,
	[CRM] [varchar](10) NULL,
	[EnderecoID] [uniqueidentifier] NULL,
 CONSTRAINT [PK_Medicos] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MedicosClinicas]    Script Date: 10/04/2024 08:21:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MedicosClinicas](
	[ID] [uniqueidentifier] NOT NULL,
	[ClinicaID] [uniqueidentifier] NULL,
	[MedicoID] [uniqueidentifier] NULL,
 CONSTRAINT [PK_MedicoClinica] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[NiveisPrioridade]    Script Date: 10/04/2024 08:21:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NiveisPrioridade](
	[ID] [uniqueidentifier] NOT NULL,
	[Prioridade] [int] NOT NULL,
 CONSTRAINT [PK_NiveisPrioridade_1] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Pacientes]    Script Date: 10/04/2024 08:21:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Pacientes](
	[ID] [uniqueidentifier] NOT NULL,
	[DataNascimento] [date] NULL,
	[RG] [varchar](50) NULL,
	[CPF] [varchar](50) NULL,
	[EnderecoID] [uniqueidentifier] NULL,
 CONSTRAINT [PK_Pacientes] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Receitas]    Script Date: 10/04/2024 08:21:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Receitas](
	[ID] [uniqueidentifier] NOT NULL,
	[Medicamento] [varchar](100) NULL,
 CONSTRAINT [PK_Receitas] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Situacoes]    Script Date: 10/04/2024 08:21:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Situacoes](
	[ID] [uniqueidentifier] NOT NULL,
	[Situacao] [varchar](50) NULL,
 CONSTRAINT [PK_Situacoes] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TiposUsuario]    Script Date: 10/04/2024 08:21:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TiposUsuario](
	[ID] [uniqueidentifier] NOT NULL,
	[TipoUsuario] [varchar](50) NULL,
 CONSTRAINT [PK_TiposUsuario] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuarios]    Script Date: 10/04/2024 08:21:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuarios](
	[ID] [uniqueidentifier] NOT NULL,
	[TipoUsuarioID] [uniqueidentifier] NULL,
	[Nome] [varchar](50) NULL,
	[Email] [varchar](255) NULL,
	[Senha] [varchar](100) NULL,
	[Foto] [varchar](100) NULL,
	[CodRecupSenha] [int] NULL,
 CONSTRAINT [PK_Usuarios] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Clinicas]  WITH CHECK ADD  CONSTRAINT [FK_Clinicas_Enderecos] FOREIGN KEY([EnderecoID])
REFERENCES [dbo].[Enderecos] ([ID])
GO
ALTER TABLE [dbo].[Clinicas] CHECK CONSTRAINT [FK_Clinicas_Enderecos]
GO
ALTER TABLE [dbo].[Consultas]  WITH CHECK ADD  CONSTRAINT [FK_Consultas_MedicosClinicas] FOREIGN KEY([MedicoClinicaID])
REFERENCES [dbo].[MedicosClinicas] ([ID])
GO
ALTER TABLE [dbo].[Consultas] CHECK CONSTRAINT [FK_Consultas_MedicosClinicas]
GO
ALTER TABLE [dbo].[Consultas]  WITH CHECK ADD  CONSTRAINT [FK_Consultas_NiveisPrioridade] FOREIGN KEY([PrioridadeID])
REFERENCES [dbo].[NiveisPrioridade] ([ID])
GO
ALTER TABLE [dbo].[Consultas] CHECK CONSTRAINT [FK_Consultas_NiveisPrioridade]
GO
ALTER TABLE [dbo].[Consultas]  WITH CHECK ADD  CONSTRAINT [FK_Consultas_Pacientes] FOREIGN KEY([PacienteID])
REFERENCES [dbo].[Pacientes] ([ID])
GO
ALTER TABLE [dbo].[Consultas] CHECK CONSTRAINT [FK_Consultas_Pacientes]
GO
ALTER TABLE [dbo].[Consultas]  WITH CHECK ADD  CONSTRAINT [FK_Consultas_Receitas] FOREIGN KEY([ReceitaID])
REFERENCES [dbo].[Receitas] ([ID])
GO
ALTER TABLE [dbo].[Consultas] CHECK CONSTRAINT [FK_Consultas_Receitas]
GO
ALTER TABLE [dbo].[Consultas]  WITH CHECK ADD  CONSTRAINT [FK_Consultas_Situacoes] FOREIGN KEY([SituacaoID])
REFERENCES [dbo].[Situacoes] ([ID])
GO
ALTER TABLE [dbo].[Consultas] CHECK CONSTRAINT [FK_Consultas_Situacoes]
GO
ALTER TABLE [dbo].[Exames]  WITH CHECK ADD  CONSTRAINT [FK_Exames_Consultas] FOREIGN KEY([ConsultaID])
REFERENCES [dbo].[Consultas] ([ID])
GO
ALTER TABLE [dbo].[Exames] CHECK CONSTRAINT [FK_Exames_Consultas]
GO
ALTER TABLE [dbo].[Medicos]  WITH CHECK ADD  CONSTRAINT [FK_Medicos_Enderecos] FOREIGN KEY([EnderecoID])
REFERENCES [dbo].[Enderecos] ([ID])
GO
ALTER TABLE [dbo].[Medicos] CHECK CONSTRAINT [FK_Medicos_Enderecos]
GO
ALTER TABLE [dbo].[Medicos]  WITH CHECK ADD  CONSTRAINT [FK_Medicos_Especialidades] FOREIGN KEY([EspecialidadeID])
REFERENCES [dbo].[Especialidades] ([ID])
GO
ALTER TABLE [dbo].[Medicos] CHECK CONSTRAINT [FK_Medicos_Especialidades]
GO
ALTER TABLE [dbo].[Medicos]  WITH CHECK ADD  CONSTRAINT [FK_Medicos_Usuarios] FOREIGN KEY([ID])
REFERENCES [dbo].[Usuarios] ([ID])
GO
ALTER TABLE [dbo].[Medicos] CHECK CONSTRAINT [FK_Medicos_Usuarios]
GO
ALTER TABLE [dbo].[MedicosClinicas]  WITH CHECK ADD  CONSTRAINT [FK_MedicosClinicas_Clinicas] FOREIGN KEY([ClinicaID])
REFERENCES [dbo].[Clinicas] ([ID])
GO
ALTER TABLE [dbo].[MedicosClinicas] CHECK CONSTRAINT [FK_MedicosClinicas_Clinicas]
GO
ALTER TABLE [dbo].[MedicosClinicas]  WITH CHECK ADD  CONSTRAINT [FK_MedicosClinicas_Medicos] FOREIGN KEY([MedicoID])
REFERENCES [dbo].[Medicos] ([ID])
GO
ALTER TABLE [dbo].[MedicosClinicas] CHECK CONSTRAINT [FK_MedicosClinicas_Medicos]
GO
ALTER TABLE [dbo].[Pacientes]  WITH CHECK ADD  CONSTRAINT [FK_Pacientes_Enderecos] FOREIGN KEY([EnderecoID])
REFERENCES [dbo].[Enderecos] ([ID])
GO
ALTER TABLE [dbo].[Pacientes] CHECK CONSTRAINT [FK_Pacientes_Enderecos]
GO
ALTER TABLE [dbo].[Pacientes]  WITH CHECK ADD  CONSTRAINT [FK_Pacientes_Usuarios] FOREIGN KEY([ID])
REFERENCES [dbo].[Usuarios] ([ID])
GO
ALTER TABLE [dbo].[Pacientes] CHECK CONSTRAINT [FK_Pacientes_Usuarios]
GO
ALTER TABLE [dbo].[Usuarios]  WITH CHECK ADD  CONSTRAINT [FK_Usuarios_TiposUsuario] FOREIGN KEY([TipoUsuarioID])
REFERENCES [dbo].[TiposUsuario] ([ID])
GO
ALTER TABLE [dbo].[Usuarios] CHECK CONSTRAINT [FK_Usuarios_TiposUsuario]
GO
USE [master]
GO
ALTER DATABASE [VitalHub_G11] SET  READ_WRITE 
GO
