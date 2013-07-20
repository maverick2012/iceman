/**
 * 
 */
package com.amzedia.xstore.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.amzedia.xstore.XstoreException;
import com.amzedia.xstore.dao.interfaces.ICustomerDao;
import com.amzedia.xstore.model.Customer;
import com.amzedia.xstore.model.ResponseWrapper;
import com.amzedia.xstore.services.interfaces.ICustomerService;
import com.amzedia.xstore.util.ResponseCode;
import com.amzedia.xstore.util.ResponseMessage;

/**
 * @author Tarun Keswani
 * 
 */

@Service
public class CustomerService implements ICustomerService {

	@Autowired
	private ICustomerDao customerDao;

	/**
	 * 
	 */
	public ResponseWrapper getCustomer(int id) throws XstoreException {

		return this.customerDao.getCustomer(id);
	}
	
	public ResponseWrapper registerCustomer(Customer customer) throws XstoreException {
		ResponseWrapper responseWrapper = new ResponseWrapper();
		try {
			responseWrapper.setStatus(ResponseCode.OK);
			responseWrapper.setMessage(ResponseMessage.SUCCESS);
			responseWrapper.setResult(this.customerDao.registerCustomer(customer));
		} catch(Exception e) {
			responseWrapper.setStatus(ResponseCode.FAIL);
			responseWrapper.setMessage(ResponseMessage.FAIL);
			responseWrapper.setResult(e.getCause().getCause().getMessage());
		}
		return responseWrapper;
		
	}

}
