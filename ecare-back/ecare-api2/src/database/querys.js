export const querys = {
  obtenerUsuarios: "SELECT * FROM Usuario",
  obtenerUsuario: "SELECT * FROM Usuario WHERE curp = @curp",
  actualizarUsuario: "UPDATE Usuario SET nombre = @nombre, correo = @correo, ap_paterno=@ap_paterno,"+ 
  "ap_materno=@ap_materno, celular=@celular, password=@password, edad=@edad  WHERE curp = @curp;",
  obtenerSexo: "SELECT * FROM Sexo;",
  obtenerOcupacion : "SELECT * FROM Ocupacion;",
  obtenerTipoUsuario : "SELECT * FROM Tipo_usuario;",
  obtenerEspecialidad : "SELECT * FROM Especialidad;",
  obtenerConsultorios : "SELECT C.*,TS.tipo_servicio FROM Consultorio C, Tipo_servicio TS WHERE C.id_consultorio = TS.id_consultorio AND estatus = 1",
  registrarUsuario : "INSERT INTO Usuario (curp, nombre, ap_paterno, ap_materno, correo, password, celular, edad, id_sexo, id_tipo_usuario, id_ocupacion)"+
  "VALUES (@curp, @nombre, @ap_paterno, @ap_materno, @correo, @password, @celular, @edad, @sexo, @tipo_usuario, @ocupacion)",
  registrarEspecialidad : "INSERT INTO Especialidad_usuario (curp, id_especialidad)"+
  "VALUES (@curp, @id_especialidad)",
  obtenerMedicamentos : "SELECT * FROM Medicamento ORDER BY id_medicamento DESC",
  obtenerServicios : "SELECT * FROM Tipo_servicio ORDER BY id_tipo_servicio DESC",
  ingresarServicio : "INSERT INTO Tipo_servicio ( tipo_servicio , costo )VALUES (@tipo_servicio, @costo);",
  ingresarMedicamento : "INSERT INTO Medicamento ( nombre_medicamento,existencia,descripcion,es_patente,id_presentacion )VALUES (@nombre_medicamento,@existencia,@descripcion,@es_patente,@id_presentacion);",
  desplegarMedicamentos : "SELECT * FROM dbo.ObtenerMedicamentosRecetados(@curp,@nombre, @ap_paterno, @ap_materno);",
  desplegarCitas : "SELECT * FROM dbo.ObtenerCitas(@curp, @fecha);",
  login: "SELECT * FROM Usuario WHERE curp = @curp and password = @password",
  obtenerDiferentesUsuarios: "SELECT * FROM Usuario WHERE (curp = @curp OR nombre = @nombre OR ap_paterno = @ap_paterno OR ap_materno = @ap_materno) AND estatus = 1",
  desplegarHistorialCitas : "SELECT * FROM dbo.ObtenerCitas(@curp,@fecha) where estatus <> 0",
  desplegarHistorialCitasDoctor : "SELECT * FROM dbo.ObtenerCitasDoctor(@curpDoctor);",
  desplegarTodoConsultorios : "SELECT * FROM Consultorio WHERE estatus = 1;",
  desplegarFiltroConsultorios : "SELECT * FROM Consultorio WHERE id_consultorio = @id_consultorio;",
  darBajaUsuario : "UPDATE Usuario SET estatus = 2 WHERE curp = @curp;",
  obtenerCupoConsulturios : "SELECT * FROM dbo.horas_ocupadas_de_consultorio(@id_consultorio, @fecha);",
  cancelarCita  : "UPDATE Cita SET estatus = 0 WHERE id_cita = @idcita;",
  obtenerCitasDoctor : "SELECT C.*, Ci.*, CT.*, TS.* FROM Consultorio C, Cita Ci,Cita_Tipo_servicio CT, Tipo_servicio TS WHERE Ci.id_cita = CT.id_cita AND CT.id_tipo_servicio = TS.id_tipo_servicio AND TS.id_consultorio = C.id_consultorio AND C.curp_doctor = @curp",
  obtenerCitasPorConsultorio : "SELECT C.*, Ci.* FROM Consultorio C, Cita Ci,Cita_Tipo_servicio CT, Tipo_servicio TS WHERE Ci.id_cita = CT.id_cita AND CT.id_tipo_servicio = TS.id_tipo_servicio AND "+
  "TS.id_consultorio = C.id_consultorio AND Ci.estatus = 1 AND  c.id_consultorio = @id_consultorio",
  cancelarConsultorio  : "UPDATE Consultorio SET estatus = 0 WHERE id_consultorio = @id_consultorio;",
  desplegarHistorialCitasPorDoctor: "SELECT C.*, Ci.*, Ci.estatus AS 'estadoCita',TS.tipo_servicio  FROM Consultorio C, Cita Ci,Cita_Tipo_servicio CT, Tipo_servicio TS WHERE Ci.id_cita = CT.id_cita AND CT.id_tipo_servicio = TS.id_tipo_servicio AND TS.id_consultorio = C.id_consultorio AND C.curp_doctor = @curpDoctor",
  desplegarHistorialCitasPorDoctorPaciente: "SELECT C.*, Ci.*, Ci.estatus AS 'estadoCita',TS.tipo_servicio ,CU.curp AS 'curpPaciente' FROM Consultorio C, Cita Ci,Cita_Tipo_servicio CT, Tipo_servicio TS , Cita_Usuario CU WHERE Ci.id_cita = CT.id_cita AND CT.id_tipo_servicio = TS.id_tipo_servicio AND TS.id_consultorio = C.id_consultorio AND CU.id_cita = Ci.id_cita AND C.curp_doctor = @curpDoctor AND CU.curp = @curpPaciente",
  obtenerRecetas : "SELECT * FROM dbo.obtener_recetas(@curp);",
  obtenerPreciosServicios : "SELECT * FROM dbo.obtener_precios_servicios(@curp, @id_cita);",
  obtenerPreciosMedicamentos : "SELECT * FROM dbo.obtener_precios_medicamentos(@curp, @id_cita);",
  obtenerCitasDoctor: "SELECT * FROM dbo.obtener_citas_doctor(@curp);"
};

