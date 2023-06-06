USE Hospital; 

EXEC insertar_usuario @curp='CURP050206HGPPNSG5',
	@correo= 'correo',
	@password='password',
	@nombre= 'nombre',
	@ap_paterno= 'apellido',
	@ap_materno= 'apellido',
	@celular='5529093724',
	@edad=21,
	@id_sexo=2,
	@id_ocupacion=4,
	@id_tipo_usuario=1,
	@id_especialidad=NULL

-- 1 -> sumar, 2 -> restar, 3 -> vaciar
EXEC actualizar_medicamento
	@nombre_medicamento='Medicamento A',
	@cantidad=5,
	@operacion=2