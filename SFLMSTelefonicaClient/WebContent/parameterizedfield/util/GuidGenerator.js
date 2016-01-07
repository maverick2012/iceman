jQuery.sap.declare("SFLMSExtCustomFieldConfig.util.GuidGenerator");

SFLMSExtCustomFieldConfig.util.GuidGenerator = {

	generateGuid : function() {
		return this._generate4Chars() + this._generate4Chars() + '-' + this._generate4Chars() + '-' + this._generate4Chars() + '-'
				+ this._generate4Chars() + '-' + this._generate4Chars() + this._generate4Chars() + this._generate4Chars();

	},    
	

	_generate4Chars : function() {
		return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	}

};