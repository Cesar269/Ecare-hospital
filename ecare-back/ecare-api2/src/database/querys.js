export const querys = {
  obtenerUsuarios: "SELECT * FROM Usuario",
  obtenerUsuario: "SELECT * FROM Usuario WHERE curp = @curp",
  actualizarUsuario: "UPDATE Usuario SET nombre = @nombre, correo = @correo, ap_paterno=@ap_paterno,"+ 
  "ap_materno=@ap_materno, celular=@celular, password=@password, edad=@edad  WHERE curp = @curp;",
  obtenerSexo: "SELECT * FROM Sexo;",
  obtenerOcupacion : "SELECT * FROM Ocupacion;",
  obtenerTipoUsuario : "SELECT * FROM Tipo_usuario;",
  obtenerEspecialidad : "SELECT * FROM Especialidad;",
  registrarUsuario : "insertar_usuario",
  obtenerMedicamentos : "SELECT * FROM Medicamento ORDER BY id_medicamento DESC",
  obtenerServicios : "SELECT * FROM Tipo_servicio ORDER BY id_tipo_servicio ASC",
  ingresarServicio : "INSERT INTO Tipo_servicio ( tipo_servicio , costo )VALUES (@tipo_servicio, @costo);",
  ingresarMedicamento : "INSERT INTO Medicamento ( nombre_medicamento,existencia,descripcion,es_patente,id_presentacion )VALUES (@nombre_medicamento,@existencia,@descripcion,@es_patente,@id_presentacion);",
  desplegarMedicamentos : "SELECT * FROM dbo.ObtenerMedicamentosRecetados(@curp,@nombre, @ap_paterno, @ap_materno);",
  desplegarCitas : "SELECT * FROM dbo.ObtenerCitas(@curp, @fecha);",
  login: "SELECT * FROM Usuario WHERE curp = @curp and password = @password",
};

