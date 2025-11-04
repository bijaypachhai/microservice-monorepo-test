import { Controller, Get, Res, Req } from "@nestjs/common";
import { MetricsService } from "./metrics.service";
import { register } from "prom-client";
import { Response, Request } from "express";

@Controller("/")
export class AppController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get("/hello")
  async getHello(@Req() req: Request): Promise<string> {
    const startTime = Number(new Date().getTime());

    this.metricsService.incrementRequestCounter();

    console.log("Metrics: ", await this.metricsService.getCount());
    setTimeout(() => console.log("This is the time out."), 5000);

    const endTime = Number(new Date().getTime());

    this.metricsService.recordHistogram(startTime, endTime, req.method);

    return "Hello from Prometheus";
  }

  @Get("metrics")
  async sendMetrics(@Res() res: Response): Promise<any> {
    res.set("Content-Type", register.contentType);
    res.end(await register.metrics());
  }
}
