import { Body, Controller, Get, Post } from '@nestjs/common';
import { ContractService } from './contract.service';
import { SetNameDto } from './dto/set-name.dto';
import { SetUserDetailsDto } from './dto/set-user-details.dto';

@Controller('contract')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Get('name')
  getName() {
    return this.contractService.getName();
  }

  @Get('mobile')
  getMobile() {
    return this.contractService.getMobile();
  }

  @Get('user-details')
  getUserDetails() {
    return this.contractService.getUserDetails();
  }

  @Post('name')
  setName(@Body() setNameDto: SetNameDto) {
    return this.contractService.setName(setNameDto.name);
  }

  @Post('user-details')
  setUserDetails(@Body() setUserDetailsDto: SetUserDetailsDto) {
    return this.contractService.setUserDetails(
      setUserDetailsDto.name,
      setUserDetailsDto.mobile,
    );
  }

  @Get('events')
  getEvents() {
    return this.contractService.getEvents();
  }
}
